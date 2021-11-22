import React, { useEffect, useState } from 'react';
import "./home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    const remove = () => {
        localStorage.removeItem('users');
        navigate("/login");
    };

    useEffect(() => {
        const getRandomContent = async () => {
            try {
                const res = await axios.get("https://fakestoreapi.com/products/category/jewelery");
                setItems(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getRandomContent();
        console.log(items);
    }, []);

    return (
        <>
            <button style={{ float: "right" }} onClick={remove}>Logout</button>
            {items.map((item) => (
                <div className="container" key={item.id}>
                    <img src={item.image} className="image" />
                    <div className="info">
                        <h1>{item.title}</h1>
                        <p>{item.description}</p>
                        <p>Price: $ {item.price}</p>
                        <p>Category: {item.category}</p>
                        <p>Rating: {item.rating.rate}</p>
                        <p>Count: {item.rating.count}</p>
                    </div>
                </div>
            ))}

        </>
    );
};

export default Home;
