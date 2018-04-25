import { CHECK_LOADING, CHECK_ERROR, FETCH_QUESTS } from '../actionTypes'
import { db } from '../../firebase/index'

export const fetchQuests = () => {
  return dispatch => {
    dispatch(loading())
    return getQuests().then((quests) => {
      dispatch({
        type: FETCH_QUESTS,
        payload: quests
      })
      return quests
    }).catch(err => {
      console.log(err)
    })
    // db.ref('Room').on('value', (snapshot) => {
    //   if (!snapshot.val()) dispatch(checkErr())
    //   let quests = []
    //   for (const key in snapshot.val()) {
    //     if (snapshot.val().hasOwnProperty(key)) {
    //       const element = snapshot.val()[`${key}`]
    //       const quest = {...element, id: key}
    //       quests.push(quest)
    //     }
    //   }
    //   return quests
    //   dispatch({
    //     type: FETCH_QUESTS,
    //     payload: quests
    //   })
    // })
  }
}


function getQuests() {
  return new Promise(function (resolve, reject) {
    db.ref('Room').on('value', (snapshot) => {
      if (!snapshot.val()) reject(dispatch(checkErr()))
      let quests = []
      for (const key in snapshot.val()) {
        if (snapshot.val().hasOwnProperty(key)) {
          const element = snapshot.val()[`${key}`]
          const quest = {...element, id: key}
          quests.push(quest)
        }
      }
      resolve(quests)
    })
  })
}

function loading() {
  return {
    type: CHECK_LOADING
  }
}

export function checkErr(payload) {
  return {
    type: CHECK_ERROR,
    payload
  }
}
