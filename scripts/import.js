var fs = require('fs');
var axios = require('axios');
var instance = axios.create({headers:{'Referer': 'https://biblio8.netlify.com'}});

var volumes = [];
var id = [
  'nc3oCwAAQBAJ',
  'krYPHmNk6TwC',
  's1DlCwAAQBAJ',
  'Xf0qAwAAQBAJ',
  'zsBDDwAAQBAJ',
  '1MBDDwAAQBAJ',
  'zMBDDwAAQBAJ',
  'ttWIDwAAQBAJ',
  'uNWIDwAAQBAJ',
  'gNWIDwAAQBAJ',
  'ahtrDwAAQBAJ',
  'lrpwDwAAQBAJ',
  '1-2DDwAAQBAJ',
  'Ank5DwAAQBAJ',
  '9c2gAQAAQBAJ',
  'O_i8AwAAQBAJ',
  'sy0qBgAAQBAJ',
  'ED1oDAAAQBAJ',
  'DaZ_DAAAQBAJ',
  '7_V7DQAAQBAJ',
  'RaeuAQAAQBAJ',
  'nbgjaiE-RKgC',
  'chBz_If57kQC',
  'xnwVBgAAQBAJ',
  'nja5dVitkPwC',
  'RV7PAQAAQBAJ',
  'l0EEDAAAQBAJ',
  'FtAwBgAAQBAJ',
  'QN4wBgAAQBAJ',
  'AMZlDQAAQBAJ',
  'IQxkKKErfyUC',
  'orm6SviFKFwC',
  'ZANzsdkPFgoC',
  'kR4W9D5ZPrIC',
  'YgLPvmxDyKwC',
  '8mzDfMne2U0C',
  '2wSm4snNw2QC',
  'HwzoF-L2TTwC',
  '97OFzbyIUFUC',
  'uaZqLoQoQk8C',
  '5VHiAAAAQBAJ',
  'onWtBAAAQBAJ',
  'Y48pCwAAQBAJ',
  'FPZ7DQAAQBAJ',
  'Z-tqDwAAQBAJ',
  'MaKuAQAAQBAJ',
  'BaGuAQAAQBAJ',
  'zaGuAQAAQBAJ',
  'ip2aDqPPKc4C',
  'vAZyCgAAQBAJ',
  '5kEVCwAAQBAJ',
  'TNYcDQAAQBAJ',
  'CyOrCwAAQBAJ',
  'CK1dDwAAQBAJ',
  'St8kBQAAQBAJ',
  'p2rTDgAAQBAJ',
  'mbPuDQAAQBAJ',
  '4MBDDwAAQBAJ',
  'aBtrDwAAQBAJ',
  '3sBDDwAAQBAJ',
  '3MBDDwAAQBAJ'
];
var promises = [];
var googleKey = 'AIzaSyCNQvQc3ty4yUjwngKsgo1aViGhJsess7c';

for (var i = 0; i < id.length; i++){
  promises.push(instance.get(`https://www.googleapis.com/books/v1/volumes/${id[i]}?key=${googleKey}`));
}
axios.all(promises)
  .then((responses) => {
    responses.forEach((response) => {
      volumes.push(response.data.volumeInfo);
    })

    var json = JSON.stringify(volumes);
    fs.writeFile('./src/data/data.json', json, 'utf8', function(err) {
      if (err) throw err;
        console.log('import data from Google Books API complete !');
    });
  }).catch((error) => {
    if (error) {
      throw error.response.data.error.message;
    }
  });
  