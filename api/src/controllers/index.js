const InventoryCtrl = require('./InventoryCtrl');
const FeedbackCtrl = require('./FeedbackCtrl');
const AccountCtrl = require('./AccountCtrl');
const VarietyCtrl = require('./VarietyCtrl');
const OAuthCtrl = require('./OAuthCtrl');
const ListCtrl = require('./ListCtrl');
const UserCtrl = require('./UserCtrl');
const MailCtrl = require('./MailCtrl');
const ChatCtrl = require('./ChatCtrl');

module.exports = {
    ...InventoryCtrl,
    ...FeedbackCtrl,
    ...VarietyCtrl,
    ...AccountCtrl,
    ...OAuthCtrl,
    ...ListCtrl,
    ...UserCtrl,
    ...MailCtrl,
    ...ChatCtrl,
};
