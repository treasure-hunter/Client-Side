import { CHECK_LOADING, CHECK_ERROR, FETCH_QUESTS } from '../actionTypes'
import { db } from '../../firebase/index'

export const fetchQuests = () => {
  return dispatch => {
    dispatch(loading())
    db.ref('Room').on('value', (snapshot) => {
      if (!snapshot.val()) dispatch(checkErr())
      let quests = []
      for (const key in snapshot.val()) {
        if (snapshot.val().hasOwnProperty(key)) {
          const element = snapshot.val()[`${key}`]
          const quest = {...element, id: key}
          quests.push(quest)
        }
      }
      dispatch({
        type: FETCH_QUESTS,
        payload: quests
      })
    })
  }
}

function loading() {
  return {
    type: CHECK_LOADING
  }
}

function checkErr(payload) {
  return {
    type: CHECK_ERROR,
    payload
  }
}
