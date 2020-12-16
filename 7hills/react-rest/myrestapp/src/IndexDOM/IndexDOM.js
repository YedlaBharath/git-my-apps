import React, { Component } from 'react'
import '../StyleCss/IndexDOM.scss'
import api from '../actions/api'
import  MainCard  from './MainCard'
import MainData from './MainData'

class IndexDOM extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            count:0,
            index:0,
            list:[{itemId:0,itemName:"",price:0,imageSrc:""}],
        }
    }
    
    mainElementClickHandler = ()=>{
        if(this.state.count%2===0)
        {
        document.getElementById("sub-container").style.display="block"
        }
        else{
        document.getElementById("sub-container").style.display="none"
        }
        this.setState({
            count:this.state.count+1
        })
    }
    fetchList(){
        api.itemsAPI().fetchAll().then(res=>{
            this.setState({
            list:[...res.data],
        })
    }).catch(err=>console.log(err))
}

    componentDidMount(){
        this.fetchList()
    }
    resetImage=()=>{
        let slideImage = document.querySelectorAll('.element-course-container');
        for(let i =0;i<slideImage;i++)
        {
            slideImage[i].style.display="none";
        }
    }
    handleSlideClick=()=>{
        var x= document.getElementById('handle-div-id');
        var y = x.getElementsByClassName("element-course-container");
        var i;
        for(i=0;i<y.length;i++)
        {
            y[i].style.left="-25rem"
        }
        console.log(y.length)
    }
    handleNextClick =()=>{
        this.setState({
            index:this.state.index+1
        })
    }
    
    render() {
    //     const {a:{itemName}} ={a:this.state.list[0]}
    // console.log(itemName)
        return (
            <React.Fragment>
                <div className="main-course-container">
                    <div className="main-course-slider">
                        <MainData></MainData>
                            {/* {
                                this.state.list.map((element,index)=>(
                                    <div key={this.state.list.itemId}>
                                        <div className="element-course-container" id="handle-slide-id">
                                            <div className="element-img-course-container">
                                                <img src={element.imageSrc} alt="Birayni" className="img-Biryani" onClick={this.mainElementClickHandler}></img>
                                                <h2 id="img-name">{element.itemName}</h2>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            } */}
                    </div>
                </div>
                <div>
                    <button onClick={()=>this.handleNextClick}>Next</button>
                </div>
                <div className="sub-course-container" id="sub-container">
                            <table>
                                <tbody>
                                    {
                                        [...Array(Math.ceil(this.state.list.length/4))]
                                        .map((element,index)=>
                                        <tr key={index}>
                                            <td>
                                                <div className="subelement-course-container">
                                                    <img src={this.state.list[4*index].imageSrc}></img>
                                                </div>
                                            
                                            </td>
                                            <td>
                                                <div className="subelement-course-container">
                                                    <img src={this.state.list[4*index+1]?this.state.list[4*index+1].imageSrc:null}></img>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="subelement-course-container">
                                                    <img src={this.state.list[4*index+2]?this.state.list[4*index+2].imageSrc:null}></img>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="subelement-course-container">
                                                    <img src={this.state.list[4*index+3]?this.state.list[4*index+3].imageSrc:null}></img>
                                                </div>
                                            </td>
                                        </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
            </React.Fragment>
        )
    }
}

export default IndexDOM
