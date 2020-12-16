
import PropTypes from 'prop-types'
import React, { Component } from 'react'


const Card = (list) => (
  <ul>
      {
          console.log(list)
      }
      {/* {
          [...Array(Math.ceil(list.length))].map((element,index)=>
                            <li key={index}>{list[index].itemId}</li>)
      } */}
    {/* {[...Array(list.length)].map((item,index) => (
      <ListItem key={index} item={item} />
    ))} */}
  </ul>
);
 
// const ListItem = ({ item }) => (
//   <li>
//     <div>{item.itemId}</div>
//     <div>{item.itemName}</div>
//     {/* <div>{item.lastname}</div>
//     <div>{item.year}</div> */}
//   </li>
// );
// const Card=({property})=> {
//     return (
//         <div>
//             <ul>
//     <li>{property.itemId}</li>
//                 {/* {console.log({property})} */}
//     {/* {
//     property.map(({properties},index) => (
//     <li key={index}>{properties}</li>
//     ))
//     } */}
//   </ul>
//         </div>
//     )
// }

export default Card


// class Card extends Component {
//     constructor({props}) {
//         super({props})
    
//         this.state = {
//             itemslist: []
//         }
//     }
//     componentDidMount(){
//         this.setState(this.props)
//     }
    
    
//     render() {
        
//         console.log(this.props)
//         console.log(this.state.itemslist.itemName)
//         return (
//             <div>
                
//             </div>
//         )
//     }
// }

// export default Card


// const Card=({property})=>{
    
    // const {itemName,imageSrc,price,itemId}=property;
    // const index=itemId
    // // console.log(index)
    // return (
    // <div>
        
    //     {
    //         console.log(property)
            // console.log(property.map(prop=><h2>{property.itemName}</h2>))
            
// }
{/* <img src={property.imageSrc}></img> */}
            {/* <label>{itemName}</label> */}
        
//         </div>
        
    
//     )
// }

// export default Card
