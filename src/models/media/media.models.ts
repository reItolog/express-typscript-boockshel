import Media from './MediaModel';

class MediaModel {
  constructor(private media = new Media) {
  }

  async getAllMedia() {
    try {
      return await this.media.fetchAll();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async saveMedia(url: string, mimetype: string, title: string, description: string ) {
    const newMedia = new Media({
      url,
      'mime type': mimetype,
      title,
      description,
    });
    try {
      return await newMedia.save().catch(e => {
        console.log(e.message);
      });

    } catch (e) {
      throw new Error(e.message);
    }
  }

}

export const mediaModel = new MediaModel();
