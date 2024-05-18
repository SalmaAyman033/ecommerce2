    let products;
    let ordersItems;
    let users;
    let data;
    
    // Function to fetch the products data from the API.
    let get_data_from_api = async () => {
        try {
            let res = await fetch("/api/v1/products/s", {
                method: "GET",
            });
            let data0 = await res.json();
            products = data0;
            return data0;
        } catch (error) {
            console.error("Error fetching products data:", error);
        }
    };
    
    // Function to fetch the orderItems data from the API.
    let get_ordersItems_from_api = async () => {
        try {
            let res = await fetch("/api/v1/order", {
                method: "GET",
            });
            let data1 = await res.json();
            ordersItems = data1;
            return data1;
        } catch (error) {
            console.error("Error fetching orders items data:", error);
        }
    };
    // fuction to fetching users data from Api
    let get_users_from_api = async () => {
        try {
            let res = await fetch("/api/v1/user", {
                method: "GET",
            });
            let data2 = await res.json();
            users = data2;
            return data2;
        } catch (error) {
            console.error("Error fetching orders items data:", error);
        }
    };
    let post_data_to_api = async (data) => {
        try {
            let res = await fetch("/api/v1/order", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
        
            let responseData = await res.json();
            console.log(responseData);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };
    
    // Fetch orders items data first, then products data.
    get_ordersItems_from_api()
        .then(() => get_data_from_api())
        .then(()=>get_users_from_api())
        .then(() => {
            let result = ordersItems.find(userOrder => userOrder.email === localStorage.getItem("email")) //to get the order of the user
            //console.log(result.orderItems)
            if(result){
                function displayOrderItems(){
                    let orderupdate = Object.keys(result.orderItems).forEach(item => {
                        //console.log(item)
                        let pName;
                        let pImg;
                        (products.products).map((product)=>{
                            //console.log(product)
                            if (product.id === item) {
                                pName = product.name;
                                pImg = product.image;
                                return 0
                            }
                            //console.log(pName)

                        })
                        //console.log(pName)
                        let sohila ="https://placehold.co/400"
                        let pre= `
                        <article class="product flex">
                            <button>
                                <i class="fa-solid fa-trash-can"> </i>
                            </button>
                            <p class="price">${result.orderItems[item]['price']*result.orderItems[item]['quantity']}</p>
                            <div class="flex" style="margin-right: 1rem">
                            <button class="decrease">-</button>
                            <div class="quantity flex">${result.orderItems[item]['quantity']}</div>
                            <button class="increase">+</button>
                            </div>
                            <p class="title">${pName}</p>
                            <img
                            style="border-radius: 0.22rem"
                            width="70"
                            height="70"
                            alt="..."
                            src="${sohila}"
                            />
                            </article>
                            `
                    //let pre=`<p>${result.orderItems[item]['quantity']}</p>`
                    document.querySelector("#cart").innerHTML += pre;
                        

                    })
                    
                }
                displayOrderItems();
            
            }
        })
        .then(()=>{
            let usersresult = users.find(user => user.email === localStorage.getItem("email"))
            let result = ordersItems.find(userOrder => userOrder.email === localStorage.getItem("email"))
            //console.log(usersresult)
            //console.log(result)
            let ls = [];
            Object.keys(result.orderItems).forEach(item => {
                ls=[...ls,item]
            })
            console.log(usersresult._id)

            data = {
                "orderItems":ls,
                "shippingAddress1":usersresult.city,
                "shippingAddress2": usersresult.street,
                "city": usersresult.city,
                "zip": usersresult.zip,
                "country": usersresult.country,
                "phone": usersresult.phone,
                "totalPrice": 50,
                "user":usersresult._id
            };  

            return data;
        })
        .then(data =>{return post_data_to_api(data)})
        .catch(error => {console.error("Error in the data fetching process:", error);
    })

    