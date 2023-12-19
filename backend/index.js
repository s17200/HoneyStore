require("dotenv").config();
let express=require("express");
const { connection } = require("./configs/db");
let cors=require("cors")

let bcrypt=require("bcrypt");
let jwt=require("jsonwebtoken");
const { Usermodel } = require("./models/user.model");
const { authenticate } = require("./middleware/authenticate");
const { Cartmodel } = require("./models/cart.model");




let app=express();
app.use(express.json());
app.use(cors());





app.get("/",(req,res)=>{
    res.send({msg:"home"})
})

app.post("/signup",async(req,res)=>{

    let {name,email,password}=req.body
    let user=await Usermodel.findOne({email})
if(user){
    res.send({msg:"pls login"})
}   else{
    try{
        let hash=bcrypt.hashSync(password,4);
await Usermodel.create({name,email,password:hash})
res.send({msg:"user sign up success"})        
    }catch(err){
        res.send({msg:"error to sign up"})
    }
}
})

app.post("/login",async(req,res)=>{
let {email,password}=req.body;
let user=await Usermodel.findOne({email});
if(user){
try{
let userpass=user.password;
let match=bcrypt.compareSync(password,userpass);
if(match){
    let token=jwt.sign({userID:user._id},process.env.SECRET_KEY);
    res.send({msg:"login success",token,userName:user.name})
}else{
    res.send({msg:"invalid credentials"})
}
}catch(err){
    res.send({msg:"login failed"})
}
}else{
    res.send({msg:"sign up first"});
}

})


// get all products in products page
app.get('/products', async(req,res)=>{
let data=[
    {
      "image": "https://images.apollo247.in/pub/media/catalog/product/d/a/dab0021_1_1.jpg",
      "productName": "Pastry - Apple Large",
      "description": "Hydromyelia",
      "price": 5267,
      "reviews": [{}],
      "id": 1
    },
    {
      "image": "https://honeyday.in/wp-content/uploads/2021/04/Ajwain-Honey.jpg",
      "productName": "Milk 2% 500 Ml",
      "description": "Chronic venous hypertension without complications",
      "price": 242,
      "reviews": [{}],
      "id": 2
    },
    {
      "image": "https://ekhadiindia.s3.ap-south-1.amazonaws.com/uploads/products/thumbnail/jpnogxPbmr8PMb59pi4I2IGgP81ihHis3zrhY9YI.jpeg",
      "productName": "Chickensplit Half",
      "description": "Lesion of lateral popliteal nerve",
      "price": 3204,
      "reviews": [{}],
      "id": 3
    },
    {
      "image": "https://static.oxinis.com/healthmug/image/product/61368-2-800.webp",
      "productName": "Veal - Inside Round / Top, Lean",
      "description": "Palindromic rheumatism, shoulder region",
      "price": 6060,
      "reviews": [{}, {}],
      "id": 4
    },
    {
      "image": "https://cdn.shopify.com/s/files/1/0584/6210/9874/products/SUB_7354_1024x1024.jpg?v=1628577369",
      "productName": "Mousse - Mango",
      "description": "Encounters for unspecified administrative purpose",
      "price": 6777,
      "reviews": [{}],
      "id": 5
    },
    {
      "image": "https://media6.ppl-media.com/tr:h-750,w-750,c-at_max,dpr-2/static/img/product/251925/nutriorg-certified-organic-honey-250-g-pack-of-2_3_display_1629965580_9e387e72.jpg",
      "productName": "Wine - Red, Harrow Estates, Cab",
      "description": "Streptobacillary fever",
      "price": 7166,
      "reviews": [{}, {}, {}],
      "id": 6
    },
    {
      "image": "https://patankarfarmproducts.com/wp-content/uploads/2020/08/500gm-honey.jpg",
      "productName": "Pepper - White, Whole",
      "description": "Accident to watercraft causing submersion injuring unspecified person",
      "price": 3971,
      "reviews": [{}, {}],
      "id": 7
    },
    {
      "image": "https://www.healthyhoney.shop/wp-content/uploads/2022/04/raw-honey-1-new.png",
      "productName": "Pork Salted Bellies",
      "description": "Screening for other disorders of blood and blood-forming organs",
      "price": 9880,
      "reviews": [{}, {}, {}],
      "id": 8
    },
    {
      "image": "https://www.bigbasket.com/media/uploads/p/l/40214348_9-bb-royal-100-pure-honey.jpg",
      "productName": "Syrup - Golden, Lyles",
      "description": "Respiratory conditions due to other specified external agents",
      "price": 1885,
      "reviews": [{}, {}, {}, {}],
      "id": 9
    },
    {
      "image": "https://www.farmhoney.in/wp-content/uploads/2014/05/Raw-honey-Front.jpg",
      "productName": "V8 Splash Strawberry Kiwi",
      "description": "Follow-up examination, following combined treatment",
      "price": 5232,
      "reviews": [{}],
      "id": 10
    },
    {
      "image": "https://www.baidyanath.co.in/images/limg/84868371_i1_.webp",
      "productName": "Corn - On The Cob",
      "description": "Unspecified maternal condition affecting fetus or newborn",
      "price": 2062,
      "reviews": [{}],
      "id": 11
    },
    {
      "image": "https://www.patanjaliayurved.net/assets/product_images/400x500/1685092024400x500.jpg",
      "productName": "Spaghetti Squash",
      "description": "Allergic rhinitis, cause unspecified",
      "price": 5514,
      "reviews": [{}, {}, {}, {}],
      "id": 12
    },
    {
      "image": "https://www.beelicious.in/wp-content/uploads/2021/11/product-3.png",
      "productName": "Pie Filling - Pumpkin",
      "description": "Closed dislocation of shoulder, other",
      "price": 2003,
      "reviews": [{}, {}, {}],
      "id": 13
    },
    {
      "image": "https://m.media-amazon.com/images/I/51Q21i2xLaL._AC_UF1000,1000_QL80_.jpg",
      "productName": "Jameson - Irish Whiskey",
      "description": "Tuberculous encephalitis or myelitis, unspecified",
      "price": 4448,
      "reviews": [{}, {}, {}],
      "id": 14
    },
    {
      "image": "https://cdn.shopify.com/s/files/1/0558/8185/9170/products/0081_Honey_500g_Front.jpg?v=1656515905",
      "productName": "Garlic - Peeled",
      "description": "Unspecified condition of the tongue",
      "price": 2061,
      "reviews": [{}],
      "id": 15
    },
    {
      "image": "https://www.honeyveda.in/wp-content/uploads/2020/04/Ajwain_500gm_01-800x800.jpg",
      "productName": "Beef - Top Butt Aaa",
      "description": "Insect bite, nonvenomous of hip, thigh, leg, and ankle, infected",
      "price": 3476,
      "reviews": [{}, {}, {}, {}],
      "id": 16
    },
    {
      "image": "http://dummyimage.com/136x100.png/ff4444/ffffff",
      "productName": "Crab Meat Claw Pasteurise",
      "description": "Lesion of sciatic nerve",
      "price": 7494,
      "reviews": [{}, {}, {}],
      "id": 17
    },
    {
      "image": "http://dummyimage.com/237x100.png/dddddd/000000",
      "productName": "Pastry - Banana Muffin - Mini",
      "description": "Unspecified polyarthropathy or polyarthritis, upper arm",
      "price": 1067,
      "reviews": [{}, {}, {}, {}],
      "id": 18
    },
    {
      "image": "http://dummyimage.com/117x100.png/ff4444/ffffff",
      "productName": "Soup - Campbells Pasta Fagioli",
      "description": "Stress incontinence, female",
      "price": 9839,
      "reviews": [{}],
      "id": 19
    },
    {
      "image": "http://dummyimage.com/204x100.png/dddddd/000000",
      "productName": "Apple - Delicious, Red",
      "description": "Monocular exotropia with other noncomitancies",
      "price": 6898,
      "reviews": [{}, {}],
      "id": 20
    },
    {
      "image": "http://dummyimage.com/181x100.png/ff4444/ffffff",
      "productName": "Tart Shells - Savory, 2",
      "description": "Phobia, unspecified",
      "price": 5707,
      "reviews": [{}, {}, {}, {}],
      "id": 21
    },
    {
      "image": "http://dummyimage.com/143x100.png/ff4444/ffffff",
      "productName": "Bagels Poppyseed",
      "description": "Illegally induced abortion, complicated by damage to pelvic organs or tissues, complete",
      "price": 4415,
      "reviews": [{}, {}, {}],
      "id": 22
    },
    {
      "image": "http://dummyimage.com/157x100.png/dddddd/000000",
      "productName": "Wine - Masi Valpolocell",
      "description": "Open fracture of ischium",
      "price": 4845,
      "reviews": [{}, {}],
      "id": 23
    },
    {
      "image": "http://dummyimage.com/246x100.png/dddddd/000000",
      "productName": "Flour - Buckwheat, Dark",
      "description": "Malignant carcinoid tumor of the bronchus and lung",
      "price": 6267,
      "reviews": [{}, {}, {}, {}],
      "id": 24
    },
    {
      "image": "http://dummyimage.com/192x100.png/cc0000/ffffff",
      "productName": "Sour Puss - Tangerine",
      "description": "Genetic susceptibility to malignant neoplasm of breast",
      "price": 7931,
      "reviews": [{}, {}, {}, {}],
      "id": 25
    },
    {
      "image": "http://dummyimage.com/205x100.png/dddddd/000000",
      "productName": "Chicken - White Meat, No Tender",
      "description": "Periostitis, without mention of osteomyelitis, forearm",
      "price": 5302,
      "reviews": [{}],
      "id": 26
    },
    {
      "image": "http://dummyimage.com/149x100.png/cc0000/ffffff",
      "productName": "Paper Towel Touchless",
      "description": "Oral aphthae",
      "price": 5279,
      "reviews": [{}, {}, {}],
      "id": 27
    },
    {
      "image": "http://dummyimage.com/235x100.png/dddddd/000000",
      "productName": "Oil - Canola",
      "description": "Accidental poisoning by glutethimide group",
      "price": 7134,
      "reviews": [{}],
      "id": 28
    },
    {
      "image": "http://dummyimage.com/215x100.png/dddddd/000000",
      "productName": "Apple - Fuji",
      "description": "Benign carcinoid tumor of the stomach",
      "price": 553,
      "reviews": [{}, {}, {}, {}],
      "id": 29
    },
    {
      "image": "http://dummyimage.com/174x100.png/ff4444/ffffff",
      "productName": "Swiss Chard",
      "description": "Anthrax septicemia",
      "price": 9758,
      "reviews": [{}, {}, {}],
      "id": 30
    },
    {
      "image": "http://dummyimage.com/128x100.png/5fa2dd/ffffff",
      "productName": "Liners - Banana, Paper",
      "description": "Peroneal muscular atrophy",
      "price": 7228,
      "reviews": [{}, {}, {}],
      "id": 31
    },
    {
      "image": "http://dummyimage.com/195x100.png/dddddd/000000",
      "productName": "Pasta - Lasagne, Fresh",
      "description": "Orbital deformities associated with craniofacial deformities",
      "price": 5247,
      "reviews": [{}, {}],
      "id": 32
    },
    {
      "image": "http://dummyimage.com/237x100.png/cc0000/ffffff",
      "productName": "Wine - Cava Aria Estate Brut",
      "description": "Hypothermia",
      "price": 914,
      "reviews": [{}, {}],
      "id": 33
    },
    {
      "image": "http://dummyimage.com/169x100.png/dddddd/000000",
      "productName": "Longos - Grilled Salmon With Bbq",
      "description": "Accidents caused by powered lawn mower",
      "price": 7470,
      "reviews": [{}, {}, {}],
      "id": 34
    },
    {
      "image": "http://dummyimage.com/229x100.png/dddddd/000000",
      "productName": "Vodka - Smirnoff",
      "description": "Unspecified complication of labor and delivery affecting fetus or newborn",
      "price": 8008,
      "reviews": [{}, {}, {}],
      "id": 35
    },
    {
      "image": "http://dummyimage.com/181x100.png/cc0000/ffffff",
      "productName": "Wine - Sauvignon Blanc Oyster",
      "description": "Balanced autosomal translocation in normal individual",
      "price": 8431,
      "reviews": [{}],
      "id": 36
    },
    {
      "image": "http://dummyimage.com/213x100.png/ff4444/ffffff",
      "productName": "Shrimp - Prawn",
      "description": "Rhinovirus infection in conditions classified elsewhere and of unspecified site",
      "price": 7451,
      "reviews": [{}, {}, {}, {}],
      "id": 37
    },
    {
      "image": "http://dummyimage.com/119x100.png/cc0000/ffffff",
      "productName": "Sauce - Soya, Light",
      "description": "Shared psychotic disorder",
      "price": 6185,
      "reviews": [{}],
      "id": 38
    },
    {
      "image": "http://dummyimage.com/203x100.png/dddddd/000000",
      "productName": "Cheese - Grana Padano",
      "description": "Cavus deformity of foot, acquired",
      "price": 7414,
      "reviews": [{}, {}, {}],
      "id": 39
    },
    {
      "image": "http://dummyimage.com/210x100.png/cc0000/ffffff",
      "productName": "Mushroom - Enoki, Fresh",
      "description": "Injury to stomach, with open wound into cavity",
      "price": 3677,
      "reviews": [{}, {}, {}],
      "id": 40
    }]
    res.send({msg:"data",data});
})

app.get('/myproducts',authenticate,async(req,res)=>{
    let mycart=  await Cartmodel.find({userID:req.userID});
    res.status(200).send({msg:'cart data',data:mycart});
})

app.post("/addtocart", authenticate,async(req,res)=>{
    try {
        let {image,productName,price,quantity}=req.body;
        let user = await Usermodel.findOne({_id:req.userID});
         if(user){
           await Cartmodel.create({image,productName,price,quantity,userID:req.userID});
           res.send({message:"Item added to cart successfully"});
         }
         else{
           res.send({message:'Wrong token inserted!'});
         }
     } catch (error) {
        res.status(500).send({message:'Item NOT added to cart!'})
     }
})


app.get('/ordered',authenticate,async(req,res)=>{
    try {
        let x= await Cartmodel.deleteMany({userID:req.userID})
  
     res.send({msg:"hello peter"});
    } catch (error) {
        console.log(error.message);
    }
})



app.listen(process.env.PORT,()=>{
    connection()
    console.log("listening at port 8080")
})