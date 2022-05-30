import Swal from 'sweetalert2';
import { Plugin } from '@nuxt/types';

const myPlugin: Plugin = (context, inject) => {
  const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  inject('toast', toast);
};

export default myPlugin;