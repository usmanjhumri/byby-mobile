const bodyParser = require("body-parser");
// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://bybymobile:bybymobie123@cluster0.nyckj.mongodb.net/by-by-mobile?retryWrites=true&w=majority",
  (err, connection) => {
    console.log(err || connection);
  }
);
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(express.json());
app.use(express.static("public"));
// -------------Data Set-----------------
const dataSet = [
  {
    isSeller: false,
    isAdmin: true,
    sellerFirstName: "khurram",
    sellerLastName: "king developer",
    sellerEmail: "admin@admin.com",
    sellerPassword: "123",
    sellerPhone: "03497672117",
    sellerState: "active",
    avaliableProduts: [{}],
  },

  // {
  //     isSeller: true,
  //     isAdmin: false,
  //     sellerFirstName: "",
  //     sellerLastName: "",
  //     sellerEmail: "seller@seller.com",
  //     sellerPassword: "123",
  //     sellerPhone: "",
  //     sellerAddress: "",
  //     sellerCity: "",
  //     sellerState: "",
  //     avaliableProduts: [{}],
  //     sellingHistory: [
  //       {
  //         buyerFirstName: "Buyer1",
  //         buyerLastName: "test",
  //         buyerFullName: "Buyer1 test",
  //         buyerContactNumber: "1234567890",
  //         buyerMobileNumber: "0987654321",
  //         IMEI: "123456789",
  //         buyedAtDate: "Nov 12, 2019",
  //       },
  //     ],
  //   },
];

// -------------Server Routes-----------------

app.get("/dataSet", (req, res) => {
  res.send(dataSet);
});
// loginRoute
app.post("/login", urlencodedParser, (req, res) => {
  const currentUser = dataSet.filter((user) =>
    user.sellerEmail === req.body.email &&
    user.sellerPassword === req.body.password
      ? true
      : false
  );
  res.send(currentUser[0]);
});
// SellerRegistrationRoute
app.post("/register", urlencodedParser, (req, res) => {
  //   console.log(req.body);
  dataSet.push({
    isSeller: true,
    isAdmin: false,
    sellerFirstName: req.body.firstName,
    sellerLastName: req.body.lastName,
    sellerEmail: req.body.email,
    sellerPassword: req.body.password,
    sellerPhone: "",
    sellerAddress: "",
    sellerCity: "",
    sellerState: "",
    avaliableProduts: [{}],
    sellingHistory: [],
  });
  res.send({ status: true });
});
// UploadIMEIRoute
app.post("/uploadIMEIData", urlencodedParser, async (req, res) => {
  //   console.log(req.body);
  const { newEntry, currentUser } = req.body;
  // const currentUserIndex = dataSet.findIndex(user => user.sellerEmail === currentUser.sellerEmail);

  dataSet.forEach((user) => {
    if (user.sellerEmail === currentUser.sellerEmail) {
      user.sellingHistory.push(newEntry);
      // console.log(user);
      res.send({ status: true });
    }
    //
  });
});
// UploadIMEIRoute
app.post("/searchIMEI", urlencodedParser, async (req, res) => {
  for (let index = 0; index < dataSet.length; index++) {
    const requiredSeller = array[index];
    requiredSeller.sellingHistory.forEach((thisSeller) => {
      if (thisSeller.IMEI === req.body.IMEI) {
        res.send(thisSeller);
      }
    });
  }
  res.send({ status: false });
});

app.listen(8080, () => {
  //   console.log("server is running");
});
