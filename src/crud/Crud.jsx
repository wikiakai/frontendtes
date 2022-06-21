import React, { Component } from "react";
import Table from "../components/Table";
import Alert from '../components/Alert';

const apiURL = "http://localhost:3003/users/";

class Crud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUser: [],       // Untuk simpan all data
      totalData: 0,       // Untuk Hitung Data
      isUpdate: false,    // Untuk Filter Fungsi 
      Notif: {            // Untuk menampung respon Server
        alertShow: false,
        actionType: '',
        responCode: 0,
      },
      DataUserNew: {      // untuk Tampung data Update / New data
        id: 1,
        nama: '',
        alamat: '',
        telpon: ''
      }
    }

  }

  componentDidMount() {
    this.GetdataUsers()
  }


  GetdataUsers() {
    fetch(apiURL).then(res => {
      if (res.status === 200)
        return res.json()
      else
        return <p>No data Found</p>
    }).then(resdata => {
      console.log(resdata)
      // console.log('Numrow', resdata.length)
      this.setState({
        dataUser: resdata,
        totalData: resdata.length
      })
    })
  }

  SaveNewDataUSer = () => {
    const Newdata = this.state.DataUserNew;

    fetch(apiURL, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Newdata)
    }).then((res) => {
      console.log(res)
      console.log("Status Create", res.status)

      // Untuk Tampung respon Dari Server
      this.setState({
        Notif: {
          alertShow: true,
          actionType: 'created',
          responCode: res.status,
        }
      })

      this.GetdataUsers()
      this.ClearForm()
    });
  }

  UpdateDataUser = () => {
    const dataUpdate = this.state.DataUserNew;
    const id = dataUpdate.id;

    fetch(apiURL + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataUpdate)
    }).then((res) => {
      console.log(res)
      console.log("Status Update", res.status)

      // Untuk Tampung respon Dari Server
      this.setState({
        Notif: {
          alertShow: true,
          actionType: 'updated',
          responCode: res.status,
        }
      })

      this.GetdataUsers()
      this.ClearForm()
    });
  }

  DeleteDataUser = (data) => {
    const id = data;

    fetch(apiURL + id, {
      method: 'DELETE',
    }).then((res) => {
      console.log(res)
      console.log("Status Delete", res.status)

      // Untuk Tampung respon Dari Server
      this.setState({
        Notif: {
          alertShow: true,
          actionType: 'deleted',
          responCode: res.status,
        }
      })

      this.GetdataUsers()
      this.ClearForm()
    });

  }

  HendelOnchange = (event) => {
    // console.log('Form Change')
    const NumberingId = this.state.totalData + 1; // Untuk ID New Data
    let prmInputUser = { ...this.state.DataUserNew }; // Copy State
    if (!this.state.isUpdate) { //Cek Jika Update Data Idnya Tidak Di Ubah
      prmInputUser['id'] = NumberingId;
    }
    prmInputUser[event.target.name] = event.target.value;
    this.setState({
      DataUserNew: prmInputUser
    })

  }
  ClearForm = () => {

    this.setState({
      isUpdate: false,
      DataUserNew: {
        id: 1,
        nama: '',
        alamat: '',
        telpon: ''
      }
    })

    // Mengembalikan Nilai Awal Notif
    setInterval(() => {
      this.setState({
        Notif: {
          alertShow: false,
          actionType: '',
          responCode: 0,
        }
      })
    }, 4500);
  }
  HendelSimpan = () => {
    if (this.state.isUpdate) {
      this.UpdateDataUser();
    } else {
      this.SaveNewDataUSer();
    }
  }

  HendelUpdate = (data) => {
    console.log('Update id', data.id);
    console.log('Update arry', data);
    this.setState({
      DataUserNew: data,
      isUpdate: true
    })
  }

  HendelDelete = (data) => {
    console.log('Id delete =', data)
    const id = data;

    if (window.confirm('Apakah data ' + id + ' ?')) {
      this.DeleteDataUser(id)
    }
  }

  render() {

    return (
      <div className="container" id="crud">
        <h1 className="text-center">Menu CRUD</h1>

        <div className="container">
          <div className="my-table" >
            <div>Total data {this.state.totalData} record</div>
            <table>
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>Nama</th>
                  <th>Telpon</th>
                  <th>Alamat</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.dataUser.map(dataUser => {
                    return <Table key={dataUser.id}
                      data={dataUser} update={this.HendelUpdate}
                      remove={this.HendelDelete} />
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className="container">
          <Alert data={this.state.Notif} />
          <div className="conten">
            <div className="form-inline" >
              <label htmlFor="nama">Nama:</label>
              <input type="text" id="nama" name="nama" onChange={this.HendelOnchange} value={this.state.DataUserNew.nama} />
              <label htmlFor="nim">NIM:</label>
              <input type="text" id="nim" name="nim" onChange={this.HendelOnchange} value={this.state.DataUserNew.nim} />
              <label htmlFor="alamat">Alamat:</label>
              <input type="text" id="alamat" name="alamat" onChange={this.HendelOnchange} value={this.state.DataUserNew.alamat} />
              <button className="my-button btn-blue" onClick={this.HendelSimpan} >Simpan</button>
            </div>
          </div>
        </div>
      </div>


    )
  }
}

export default Crud;