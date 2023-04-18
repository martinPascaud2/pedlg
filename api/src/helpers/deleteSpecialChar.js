const deleteSpecialChar = (str) => {
    if (typeof str === 'string') {
        let s = str;
        const rawAccentStr = 'ÀÁÂàáâÈÉÊèéêÇçÛûôï';
        const notAccentStr = 'aaaaaaeeeeeeccuuoi';
        const rawAccentTab = rawAccentStr.split('');
        const notAccentTab = notAccentStr.split('');
        const tabCorrAcc = [];
        let i = 0;
        while (rawAccentTab[i]) {
            tabCorrAcc[rawAccentTab[i]] = notAccentTab[i];
            i += 1;
        }
        s = s.replace(/./g, (key) => (tabCorrAcc[key] ? tabCorrAcc[key] : key));
        return s.toLowerCase().replace(/[\s'’/–]+/g, '-');
    }
    return str;
};

module.exports = deleteSpecialChar;
