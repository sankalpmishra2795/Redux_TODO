export const addTodo = (payload) => {
  return {
    type: 'ADD_TODO',
    payload,
  };
};

export const complet = (payload) => {
  return {
    type: 'COMPLETE',
    payload,
  };
};

export const remove = (payload) => {
  return {
    type: 'DELETE',
    payload,
  };
};
