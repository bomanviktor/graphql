import { JWToken } from "./auth.js"

import timeline from "./timeline.js"
import auditRatio from "./auditratio.js"

const query = `
    {
  user {
    firstName
    login
    attrs
    campus
    level: transactions(
      where: {type: {_eq: "level"}, path: {_ilike: "%/school-curriculum/%"}}
      order_by: {amount: desc}
      limit: 1
    ) {
      amount
    }
    upAmount: transactions_aggregate(where: {type: {_eq: "up"}}) {
      aggregate {
        sum {
          amount
        }
      }
    }
    downAmount: transactions_aggregate(where: {type: {_eq: "down"}}) {
      aggregate {
        sum {
          amount
        }
      }
    }
    xpAmount: transactions_aggregate(
      where: {type: {_eq: "xp"}, _or: [{attrs: {_eq: {}}}, {attrs: {_has_key: "group"}}], _and: [{path: {_nlike: "%/piscine-js/%"}}, {path: {_nlike: "%/piscine-go/%"}}]}
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
    timeline: transactions(
      where: {type: {_eq: "xp"}, _or: [{attrs: {_eq: {}}}, {attrs: {_has_key: "group"}}], _and: [{path: {_nlike: "%/piscine-js/%"}}, {path: {_nlike: "%/piscine-go/%"}}]}
    ) {
      amount
      createdAt
      path
    }
  }
}
  `

export const queryAllData = () => {
fetch('https://01.gritlab.ax/api/graphql-engine/v1/graphql', {
  method: 'POST',
  headers: {
      'Authorization': 'Bearer ' + JWToken.value,
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ query: query }),
})
.then((res) => res.json())
.then((data) => {
      const user = data.data.user[0]

      const image = user.attrs.image
      const totalXpAmount = user.xpAmount.aggregate.sum.amount / 1000
      
      const up = user.upAmount.aggregate.sum.amount
      const down = user.downAmount.aggregate.sum.amount
      const total = ((up + down) / 1000).toFixed(2)
      const ratio = (up / down).toFixed(2)
      const level = user.level[0].amount

      const firstName = document.getElementById("first-name")
      const username = document.getElementById("user-name")
      const age = document.getElementById("age")
      const gender = document.getElementById("gender")
      const imageElement = document.getElementById("image")


      const totalXp = document.getElementById("total-xp")
      const levelElement = document.getElementById("level")
      const totalAudit = document.getElementById("total-audit")
      const auditRatioElement = document.getElementById("audit-ratio")

      
      firstName.textContent = `Welcome ${user.firstName}!`
      username.textContent = `aka ${user.login}`
      age.textContent = "Year of birth: " + user.attrs.yearOfBirth
      gender.textContent = "Gender: " + user.attrs.gender

      imageElement.src = image
      
      totalXp.textContent = `Total XP: ${totalXpAmount}XP(kB)`
      levelElement.textContent = `Level: ${level}`
      
      totalAudit.textContent = `Done and recieved: ${total}XP(kB)`
      auditRatioElement.textContent = `Ratio: ${ratio}`


      google.charts.setOnLoadCallback(timeline(user.timeline))
      google.charts.setOnLoadCallback(
        auditRatio(up/1000,
                  down/1000)
      )
    })
}

// xpAmount
// : 
// aggregate
// : 
// sum
// : 
// {amount: 596650}
