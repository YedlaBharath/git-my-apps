import React, { Component } from 'react'
import '../StyleCss/IndexDOM.css'
import api from '../actions/api'

class IndexDOM extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            count:0,
            list:[]
        }
    }
    
    mainElementClickHandler = ()=>{
        if(this.state.count%2===0)
        {
        document.getElementById("sub-container").style.display="block"
        document.getElementById("sub-container").style.transition="0.5s"
        // document.getElementById("sub-container").style.transform="scale(1.1)"
        // document.getElementById("sub-container").style.transition="0.5s"
        // this.state.count++;
        }
        else{
        document.getElementById("sub-container").style.display="none"
        // this.state.count++;
        }
        this.setState({
            count:this.state.count+1
        })
    }
    fetchList(){
        api.itemsAPI().fetchAll().then(res=>{
            // console.log(res.data);
            this.setState({
            ...this.state.list,
            list:[...res.data],
        })
        // console.log(this.state.list)
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
        // let slideImage = document.querySelectorAll('.element-course-container');
        // slideImage[0].style.display = "block";
        // this.resetImage()
        
        var x= document.getElementById('handle-div-id');
        var y = x.getElementsByClassName("element-course-container");
        var i;
        for(i=0;i<y.length;i++)
        {
            // y[i].style.transform="translatex(-25rem)"
            y[i].style.left="-25rem"
            
        // document.getElementById("handle-slide-id").style.overflow="visible"
        }
        console.log(y.length)
        // if(this.state.count<y.length)
        // {
        //     y[this.state.count].style.left="-25rem"
        //     this.state.count = this.state.count+1
        // }
        // document.getElementById("handle-slide-id").style.left="-25rem"
    }
    // imageCard(data) {
    //     `<div className="card">
    //         <img src={data.imageSrc} className="card-img-top"></img>
    //     </div>`
    // }
    render() {
        return (
            <React.Fragment>
                <div className="main-course-container" id="handle-div-id">
                    <div className="element-course-container" id="handle-slide-id">
                        <div className="element-img-course-container">
                            <img src="/image/Biryani.jpg" alt="Birayni" className="img-Biryani" onClick={this.mainElementClickHandler}></img>
                            <h2 id="img-name">Biryani Section</h2>
                        </div>
                    </div>
                    <div className="element-course-container">
                        <div className="element-img-course-container">
                            <img src="/image/Biryani.jpg" alt="Birayni" className="img-Biryani" onClick={this.mainElementClickHandler}></img>
                            <h2>Non-Veg Curry Section</h2>
                        </div>
                    </div>
                    <div className="element-course-container">
                        <div className="element-img-course-container">
                            <img src="/image/Biryani.jpg" alt="Birayni" className="img-Biryani" onClick={this.mainElementClickHandler}></img>
                            <h2>Veg Curry Section</h2>
                        </div>
                    </div>
                    <div className="element-course-container">
                        <div className="element-img-course-container">
                            <img src="/image/Biryani.jpg" alt="Birayni" className="img-Biryani" onClick={this.mainElementClickHandler}></img>
                            <h2>Roti Section</h2>
                        </div>
                    </div>
                    <div className="element-course-container">
                        <div className="element-img-course-container">
                            <img src="/image/Biryani.jpg" alt="Birayni" className="img-Biryani" onClick={this.mainElementClickHandler}></img>
                            <h2>Dessert Section</h2>
                        </div>
                    </div>
                    <div className="element-course-container">
                        <div className="element-img-course-container">
                            <img src="/image/Biryani.jpg" alt="Birayni" className="img-Biryani" onClick={this.mainElementClickHandler}></img>
                            <h2>Roti Section</h2>
                        </div>
                    </div>
                </div>
                <div className="arrow-element">
                        <div className="right-arrow-element-container" onClick={this.handleSlideClick}>
                            <i className="fas fa-arrow-right"></i>
                        </div>
                </div>
                {/* <h2>{this.state.count}</h2> */}
                <div className="sub-course-container" id="sub-container">
                        {/* <div className="subelement-course-container"> */}
                            <table>
                                <tbody>
                                    {
                                        // [...this.state.list].map((element,index)=>
                                        //     <tr key={index}>
                                        //         <td>
                                        //             <img src={this.state.list[index].imageSrc}></img>
                                        //         </td>
                                        //     </tr>
                                        // )
                                        [...Array(Math.ceil(this.state.list.length/4))]
                                        // [...this.state.list]
                                        .map((element,index)=>
                                        <tr key={index}>
                                            <td>
                                                <div className="subelement-course-container">
                                                    <img src={this.state.list[4*index].imageSrc}></img>
                                                </div>
                                                {/* {()=>this.imageCard(this.state.list[3*index])} */}
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
                    {/* </div> */}
            </React.Fragment>
        )
    }
}

export default IndexDOM
