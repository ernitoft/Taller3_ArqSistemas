let globalUserId = null;

/**
 * @param {string} userId
 * @returns {void}
 * @description
 * Esta función se encarga de guardar el id del usuario en una variable global.
 */

export const setGlobalUserId = (userId) => {
  globalUserId = userId;
};

export const getGlobalUserId = () => {
  return globalUserId;
};
