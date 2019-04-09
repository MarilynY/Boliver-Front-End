import React from 'react';

export class Bilibili extends React.Component{

    display = () => {
        const { loading } = this.props;
        if(loading){
            return(
                <div className="bilibili">
                    <img src={require('../assets/images/workHardLoading.gif')} alt="thinking..." />
                </div>
            )
        }else{
            return (
                <div className="bilibili">
                    <img src={require('../assets/images/22.gif')} alt="thinking..." />
                    <img src={require('../assets/images/33.gif')} alt="huuuu..." />
                </div>
            )
        }
    }
    render() {
        return (
            this.display()
        )
    }
}