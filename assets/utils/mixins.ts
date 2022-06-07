import moment from "moment";

export function fromNow(dateTime: string) {
  return dateTime ? moment(dateTime).fromNow() : '-';
};

export function emptyImage(src: string) {
  return src || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT19eLyqRHQDO-VnXj1HhzL_9q8yHF-3ewIhA&usqp=CAU';
}
