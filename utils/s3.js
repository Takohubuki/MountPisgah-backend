import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import 'dotenv/config'

class s3Client {
  constructor(config) {
    this.client = new S3Client({
      endpoint: "sgp1.vultrobjects.com",
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SERCET_ACCESS_KEY,
      },
    });
  }

  async putObject(bucket, key, body, options = {}) {
    try {
      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ...options,
      });
      const result = await this.client.send(command);
      console.log(`Uploaded object: ${result}`);
      return result;
    } catch (e) {
      console.error(`Failed to upload object: ${e}`);
      throw e;
    }
  }
}
