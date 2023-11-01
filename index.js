// functions/upload.js
const fs = require('fs');
const { join } = require('path');

exports.handler = async (event) => {
  try {
    const { name, type, data } = JSON.parse(event.body);
    const folder = 'sick-leave-docs';
    const filePath = join(folder, name);

    // Create the folder if it doesn't exist
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }

    fs.writeFileSync(filePath, Buffer.from(data, 'base64'));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Sick leave document uploaded and saved.' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred while uploading the document.' }),
    };
  }
};
