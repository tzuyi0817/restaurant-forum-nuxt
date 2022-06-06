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
      return src || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT19eLyqRHQDO-VnXj1HhzL_9q8yHF-3ewIhA&usqp=CAU';
    }
  }
};
