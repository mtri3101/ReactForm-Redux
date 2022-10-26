import React, { Component } from 'react'
import {connect} from 'react-redux'


class Table extends Component {

    

    render() {
        const {arrSV} = this.props
        return (
            <div className='container'>
                <table className='table mt-3'>
                    <thead className='bg-dark text-white'>
                        <tr>
                            <th>Mã SV</th>
                            <th>Họ tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrSV.map((SV, index) => {
                            return (
                                <tr key={index}>
                                    <td>{SV.maSV}</td>
                                    <td>{SV.hoTen}</td>
                                    <td>{SV.soDienThoai}</td>
                                    <td>{SV.email}</td>
                                    <td><button className='btn btn-danger' onClick={() => { 
                                        
                                    }}>Xóa</button></td>
                                    <td><button className='btn btn-primary'>Sửa</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        arrSV: state.FormReducer.arrSV
    }

};

const mapDispatchToProps = (dispatch) => {
    
}

export default connect(mapStateToProps,null)(Table)

