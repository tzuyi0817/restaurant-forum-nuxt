import moment from "moment";

export const fromNowFilter = {
  filters: {
    fromNow(dateTime: string) {
      return dateTime ? moment(dateTime).fromNow() : '-';
    }
  }
};

export const emptyImageFilter = {
  filters: {
    emptyImage(src: string) {
      return src || 'http://via.placeholder.com/300x300?text=No+Image';
    }
  }
};
