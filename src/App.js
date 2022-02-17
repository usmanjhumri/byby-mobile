import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Contact from './components/contact/Contact';
import Sellerinfo from './components/seller/SellerInfo';
import Trackmobile from './components/track/TrackMobile';
import Uploadrecord from './components/upload/UploadRecord';
import Login from './components/login/Login';
import Signup from './components/signUp/SignUp';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  const [dataSet, setDataSet] = useState(false);
  const [currentUser, setcurrentUser] = useState(false);

  console.log('currentUser', currentUser);
  console.log('dataSet', dataSet);



  useEffect(async () => {
    try {
      const response = await axios.get('http://localhost:8080/dataSet');
      setDataSet(response.data);
      // loginRoute

    } catch (error) {
      // console.log(error);

    }
  }, []);








  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/sellerinfo" element={<Sellerinfo dataSet={dataSet} />} />
        <Route exact path="/trackmobile" element={<Trackmobile dataSet={dataSet} />} />
        <Route exact path="/uploadrecord" element={<Uploadrecord currentUser={currentUser} setDataSet={setDataSet} />} />
        <Route exact path="/login" element={<Login setcurrentUser={setcurrentUser} />} />
        <Route exact path="/signup" element={<Signup dataSet={dataSet} setDataSet={setDataSet} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
