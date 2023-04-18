const { Op } = require('sequelize');
const nodemailer = require('nodemailer');

const { CronJob } = require('cron');

const {
    generateTokenForMail,
    generateTokenForRecoveryPassword,
    destroyTokenForMail,
} = require('../helpers/jwt.utils');

const ApiError = require('../helpers/ApiError');
const { error } = require('../constante');

const models = require('../../models');

const { User } = models;

const { CLIENT_URL, MAIL_USER, MAIL_SECRET } = process.env;

const mailConfig = {
    host: 'smtp.gmail.com',
    service: 'Gmail',
    port: 587,
    secure: true,
    auth: {
        user: MAIL_USER,
        pass: MAIL_SECRET,
    },
};

const sendMail = async (template) => {
    const transporter = nodemailer.createTransport(mailConfig);
    return transporter.sendMail(template);
};

const MailCtrl = {
    // VERIFICATION MAIL
    async verifyMail(id) {
        const user = await User.findOne({
            where: { id },
        });
        const { register } = user;
        if (register) return false;

        const [updated] = await User.update({ register: 1 }, { where: { id } });

        if (!updated) throw new ApiError(error.global.UPDATED, { path: 'verifyMail' });
        destroyTokenForMail(id);
        return true;
    },

    // SEND NEW VARIETY
    async sendNewVariety(params) {
        const { name, id } = params;

        const user = await User.findByPk(id);
        if (!user) {
            throw new ApiError(error.global.UPDATED, {
                path: 'sendNewVariety',
            });
        }

        const { email, username } = user;

        sendMail({
            from:
                '"🌱 Prends-en de la graine 🌱" <team@prendsendelagraine.net>',
            to: 'kevin@prendsendelagraine.net',
            subject: 'Demande ajout de variété ✔',
            html: `Message de ${username} (email:${email}, id:${id}): \n${name}`,
        });
    },
    // SEND CONFIRMATION MAIL
    async sendConfirmationMail(email, username, id) {
        const token = await generateTokenForMail(id);
        const param = `/auth/confirmation?token=${token}`;

        const info = await sendMail({
            from:
                '"🌱 Prends-en de la graine 🌱" <team@prendsendelagraine.net>',
            to: email,
            subject: 'Confirmation de ton inscription ✔',
            html: `
            <meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
            <meta content="width=device-width, initial-scale=1" name="viewport">
            <meta content="IE=edge" http-equiv="X-UA-Compatible">
            <title>Confirmation instructions</title>
            <style data-premailer="ignore" type="text/css">
               body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{mso-table-lspace:0pt;mso-table-rspace:0pt}img{-ms-interpolation-mode:bicubic}.hidden{display:none !important;visibility:hidden !important}a[x-apple-data-detectors]{color:inherit !important;text-decoration:none !important;font-size:inherit !important;font-family:inherit !important;font-weight:inherit !important;line-height:inherit !important}div[style*='margin: 16px 0']{margin:0 !important}@media only screen and (max-width: 639px){body,#body{min-width:320px !important}table.wrapper{width:100% !important;min-width:320px !important}table.wrapper td.wrapper-cell{border-left:0 !important;border-right:0 !important;border-radius:0 !important;padding-left:10px !important;padding-right:10px !important}}
            </style>
            <style>body {
               margin: 0 !important; background-color: #fafafa; padding: 0; text-align: center; min-width: 640px; width: 100%; height: 100%; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
               }
            </style>
            <table border="0" cellpadding="0" cellspacing="0" id="body" style="text-align: center; min-width: 640px; width: 100%; margin: 0; padding: 0;" bgcolor="#fafafa">
               <tbody>
                  <tr class="line">
                     <td style="font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; height: 4px; font-size: 4px; line-height: 4px;" bgcolor="#aa80ff"></td>
                  </tr>
                  <tr class="header">
                     <td style="font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.6; color: #5c5c5c; padding: 25px 0;">
                        <img alt="Prends-en-de-la-graine" src="https://zupimages.net/up/20/18/ixda.png" width="64" height="87">
                     </td>
                  </tr>
                  <tr>
                     <td style="font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;">
                        <table border="0" cellpadding="0" cellspacing="0" class="wrapper" style="width: 640px; border-collapse: separate; border-spacing: 0; margin: 0 auto;">
                           <tbody>
                              <tr>
                                 <td class="wrapper-cell" style="font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; border-radius: 3px; overflow: hidden; padding: 18px 25px; border: 1px solid #ededed;" align="left" bgcolor="#ffffff">
                                    <table border="0" cellpadding="0" cellspacing="0" class="content" style="width: 100%; border-collapse: separate; border-spacing: 0;">
                                       <tbody>
                                          <tr>
                                             <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; color: #333333; font-size: 15px; font-weight: 400; line-height: 1.4; padding: 15px 5px;" align="center">
                                                <div id="content">
                                                   <h1 style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; color: #333333; font-size: 18px; font-weight: 400; line-height: 1.4; margin: 0; padding: 0;" align="center">${email}</h1>
                                                   <p>Cliquez sur le lien ci-dessous pour confirmer votre adresse email.</p>
                                                   <div id="cta">
                                                      <a href="${CLIENT_URL}${param}" style="color: #3777b0; text-decoration: none;">Je confirme !</a>
                                                   </div>
                                                </div>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </td>
                  </tr>
                  <tr class="footer">
                     <td style="font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.6; color: #5c5c5c; padding: 25px 0;">
                     </td>
                  </tr>
                  <tr>
                     <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; font-size: 13px; line-height: 1.6; color: #5c5c5c;">
                        <div>
                           🌱 Partagez, échangez, sauvez la biodiversité ! 🌱
                        </div>
                     </td>
                  </tr>
                  <tr>
                     <td class="footer-message" style="font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.6; color: #5c5c5c; padding: 25px 0;">
                     </td>
                  </tr>
               </tbody>
            </table>`,
        });
        console.log(info.messageId);
        return true;
    },

    // RESEND CONFIRMATION MAIL
    async resendConfirmationMail({ id }) {
        const user = await User.findOne({
            where: { id },
            attributes: { include: ['username', 'email'] },
        });

        if (!user) throw new ApiError(error.user.FOUND);

        const { username, email, register } = user;

        if (register) throw new ApiError(error.user.ALREADY_VALIDATED);

        return MailCtrl.sendConfirmationMail(email, username, id);
    },

    // SEND MAIL RECOVERY PASSWORD
    async sendMailRecoveryPassword(email, username, id) {
        const token = await generateTokenForRecoveryPassword(id);
        const param = `/auth/recovery?token=${token}`;
        try {
            const info = await sendMail({
                from:
                    '"🌱 Prends-en de la graine 🌱" <team@prendsendelagraine.net>',
                to: email,
                subject: 'Récupération de compte',
                html: `
                <meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
                <meta content="width=device-width, initial-scale=1" name="viewport">
                <meta content="IE=edge" http-equiv="X-UA-Compatible">
                <title>Confirmation instructions</title>
                <style data-premailer="ignore" type="text/css">
                   body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{mso-table-lspace:0pt;mso-table-rspace:0pt}img{-ms-interpolation-mode:bicubic}.hidden{display:none !important;visibility:hidden !important}a[x-apple-data-detectors]{color:inherit !important;text-decoration:none !important;font-size:inherit !important;font-family:inherit !important;font-weight:inherit !important;line-height:inherit !important}div[style*='margin: 16px 0']{margin:0 !important}@media only screen and (max-width: 639px){body,#body{min-width:320px !important}table.wrapper{width:100% !important;min-width:320px !important}table.wrapper td.wrapper-cell{border-left:0 !important;border-right:0 !important;border-radius:0 !important;padding-left:10px !important;padding-right:10px !important}}
                </style>
                <style>body {
                   margin: 0 !important; background-color: #fafafa; padding: 0; text-align: center; min-width: 640px; width: 100%; height: 100%; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                   }
                </style>
                <table border="0" cellpadding="0" cellspacing="0" id="body" style="text-align: center; min-width: 640px; width: 100%; margin: 0; padding: 0;" bgcolor="#fafafa">
                   <tbody>
                      <tr class="line">
                         <td style="font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; height: 4px; font-size: 4px; line-height: 4px;" bgcolor="#aa80ff"></td>
                      </tr>
                      <tr class="header">
                         <td style="font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.6; color: #5c5c5c; padding: 25px 0;">
                            <img alt="Prends-en-de-la-graine" src="https://zupimages.net/up/20/18/ixda.png" width="64" height="87">
                         </td>
                      </tr>
                      <tr>
                         <td style="font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;">
                            <table border="0" cellpadding="0" cellspacing="0" class="wrapper" style="width: 640px; border-collapse: separate; border-spacing: 0; margin: 0 auto;">
                               <tbody>
                                  <tr>
                                     <td class="wrapper-cell" style="font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; border-radius: 3px; overflow: hidden; padding: 18px 25px; border: 1px solid #ededed;" align="left" bgcolor="#ffffff">
                                        <table border="0" cellpadding="0" cellspacing="0" class="content" style="width: 100%; border-collapse: separate; border-spacing: 0;">
                                           <tbody>
                                              <tr>
                                                 <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; color: #333333; font-size: 15px; font-weight: 400; line-height: 1.4; padding: 15px 5px;" align="center">
                                                    <div id="content">
                                                       <h1 style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; color: #333333; font-size: 18px; font-weight: 400; line-height: 1.4; margin: 0; padding: 0;" align="center">${email}</h1>
                                                       <p>Cliquez sur le lien ci-dessous pour récupèrer votre compte si vous êtes à l'origine de la demande.</p>
                                                       <div id="cta">
                                                          <a href="${CLIENT_URL}${param}" style="color: #3777b0; text-decoration: none;">Je récupère mon compte!</a>
                                                       </div>
                                                    </div>
                                                 </td>
                                              </tr>
                                           </tbody>
                                        </table>
                                     </td>
                                  </tr>
                               </tbody>
                            </table>
                         </td>
                      </tr>
                      <tr class="footer">
                         <td style="font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.6; color: #5c5c5c; padding: 25px 0;">
                         </td>
                      </tr>
                      <tr>
                         <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; font-size: 13px; line-height: 1.6; color: #5c5c5c;">
                            <div>
                               🌱 Partagez, échangez, sauvez la biodiversité ! 🌱
                            </div>
                         </td>
                      </tr>
                      <tr>
                         <td class="footer-message" style="font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.6; color: #5c5c5c; padding: 25px 0;">
                         </td>
                      </tr>
                   </tbody>
                </table>`,
            });
            console.log(info.messageId);
            return true;
        } catch (e) {
            return false;
        }
    },

    async sowingAlertVariety() {
        const month = new Date().getMonth() + 1;
        console.log(month, typeof month);
        const users = await User.findAll({
            attributes: { exclude: ['password'] },
            logging: (err) => console.log(err),
            include: [
                {
                    association: 'stock',
                    include: [
                        {
                            association: 'varieties',
                            include: [
                                {
                                    association: 'directSowingDate',
                                    where: {
                                        [Op.and]: [
                                            { startDate: { [Op.lte]: month } },
                                            { endDate: { [Op.gte]: month } },
                                        ],
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        });
        console.log(users[0].stock[0].varieties);
    },
};

const job = new CronJob('1 9 * * * *', () => {
    console.log('ici');
    MailCtrl.sowingAlertVariety();
});
job.start();

module.exports = MailCtrl;
