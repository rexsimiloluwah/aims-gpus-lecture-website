/** Prefix a site path with the deploy base, e.g. url('quiz/') -> '/aims-gpus-lecture-website/quiz/'. */
const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export const url = (path = '') => base + path.replace(/^\//, '');
