import React, { Component } from 'react'
import { connect } from 'react-redux'
import Table from '../Components/Table'
import { themSV } from '../redux/reducer/FormReducer'

class ReactForm extends Component {

    state = {
        values: {
            maSV: '',
            hoTen: '',
            soDienThoai: '',
            email: ''
        },
        errors: {
            maSV: '',
            hoTen: '',
            soDienThoai: '',
            email: ''
        },
        isSubmit: true,
    }

    handleChange = (e) => {
        let { value, id } = e.target;
        let newValues = { ...this.state.values }

        let newErrors = { ...this.state.errors }
        let messErros = '';
        if (value.trim() === '') {
            messErros = id + ' không được bỏ trống !'
        } else {
            let dataType = e.target.getAttribute('data-type');
            if (dataType === 'number') {
                let regexNumber = /^\d+$/;
                if (!regexNumber.test(value)) {
                    messErros = id + ' phải nhập số !'
                }
            }
            if (dataType === 'hoTen') {
                let regexName = /^[a-z ,.'-]+$/i;
                if (!regexName.test(value)) {
                    messErros = 'Họ tên phải đúng định dạng !'
                }
            }
            if (dataType === 'email') {
                let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!regexEmail.test(value)) {
                    messErros = id + ' không đúng định dạng !'
                }
            }
        }

        newErrors[id] = messErros;

        let submit = false;
        for (let key in newValues) {
            if (newValues[key].toString().trim() === '') {
                submit = true
            }
        }

        newValues[id] = value;
        this.setState({
            values: newValues,
            errors: newErrors,
            isSubmit: submit
        })
    }

    editSV = (SV) => {
        this.setState({
            values: SV
        })
    }

    handleUpdate = () => {
        const updateDetail = {
            maSV: this.state.values.maSV,
            hoTen: this.state.values.hoTen,
            soDienThoai: this.state.values.soDienThoai,
            email: this.state.values.email,
        };
        this.props.suaSV(updateDetail);
    }

    deleteSV = (id) => {
        this.props.xoaSV(id)

    }



    handleSubmit = (e) => {
        e.preventDefault();
        let { errors } = this.state;
        for (let key in errors) {
            if (errors[key] !== '') {
                alert('Dữ liệu không hợp lệ');
                return;
            }
        }
        this.props.themSV(this.state.values);
        console.log('arrSV',this.props.arrSV)
    }

    handleSearch = (e) =>{
        let {value} = e.target;
        this.props.findSV(value)
        
    }
  


    render() {
        const { arrSV } = this.props;
        const { maSV, hoTen, soDienThoai, email } = this.state.errors;
        return (
            <div className='container'>
                <form onSubmit={this.handleSubmit}>
                    <div className="card">
                        <div className="card-header bg-dark text-white">
                            <h3>Thông tin sinh viên</h3>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group mb-2">
                                        <p className='mb-0'>Mã SV</p>
                                        <input data-type='number' className='form-control' id='maSV' name='maSV' onChange={this.handleChange} value={this.state.values.maSV} />
                                        <span className='text-danger'>{maSV}</span>
                                    </div>
                                    <div className="form-group">
                                        <p className='mb-0'>Số điện thoại</p>
                                        <input data-type='number' className='form-control' id='soDienThoai' name='soDienThoai' onChange={this.handleChange} value={this.state.values.soDienThoai} />
                                        <span className='text-danger'>{soDienThoai}</span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group mb-2">
                                        <p className='mb-0'>Họ tên</p>
                                        <input data-type='hoTen' className='form-control' id='hoTen' name='hoTen' onChange={this.handleChange} value={this.state.values.hoTen} />
                                        <span className='text-danger'>{hoTen}</span>
                                    </div>
                                    <div className="form-group">
                                        <p className='mb-0'>Email</p>
                                        <input data-type='email' className='form-control' id='email' name='email' onChange={this.handleChange} value={this.state.values.email} />
                                        <span className='text-danger'>{email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type='submit' className='btn btn-primary' disabled={this.state.isSubmit}>Thêm sinh viên</button>
                            <button className='btn btn-success mx-3' type='button' onClick={() => { this.handleUpdate() }}>Update</button>
                            <input  type="text" placeholder='Search'  id='search' onInput={this.handleSearch} />
                        </div>
                    </div>
                </form>
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
                                        this.deleteSV(SV.maSV)
                                    }}>Xóa</button></td>
                                    <td><button className='btn btn-primary' onClick={() => {
                                        this.editSV(SV)
                                    }}>Sửa</button></td>
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
    return {
        themSV: (SV) => {
            const action = {
                type: 'THEM_SV',
                payload: SV
            }
            dispatch(action)
        },
        xoaSV: (id) => {
            const action = {
                type: 'XOA_SV',
                payload: id
            }
            dispatch(action)
        },
        suaSV: (updateDetail) => {
            const action = {
                type: 'SUA_SV',
                payload: updateDetail
            }
            dispatch(action)
        },
        findSV: (value) =>{
            const action = {
                type: 'FIND_SV',
                payload: value
            }
            dispatch(action)
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactForm)