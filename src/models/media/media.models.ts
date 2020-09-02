import Media from './MediaModel';
import {IMedia} from '../../shared/interfaces/media'


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

  async saveMedia(media: IMedia ) {
    const newMedia = new Media(media);
    try {
      return await newMedia.save().catch((e: any) => {
        console.log(e.message);
      });

    } catch (e) {
      throw new Error(e.message);
    }
  }

}

export const mediaModel = new MediaModel();
