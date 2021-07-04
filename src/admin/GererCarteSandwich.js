
import React, { useState, useEffect } from "react";
import Layout2 from "../core/Layout2";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getSandwichs, deleteSandwich } from "./apiAdmin";

 

const GererCarteSandwich =()=> {
const [sandwichs, setSandwichs ] = useState ([]);
 const { user, token } = isAuthenticated();



 const loadSandwichs = () => {
        getSandwichs().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setSandwichs(data);
            }
        });
    };



 

 const destroy = sandwichId => {
        deleteSandwich(sandwichId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadSandwichs();
            }
        });
    };

    useEffect(() => {
        loadSandwichs();
    }, []);

    
        
  

     return (
       <Layout2
            title="Gérer les cartes"
            description="Supprimer - Modifier"
            className="container-fluid"
        >
            <div className="row">
<div className="col-12">
<h2 className="text-center">
      Total {sandwichs.length} 
</h2>
<hr />
<ul className="list-group">
{sandwichs.map((s, i) => (
<li
key={i}
className="list-group-item d-flex justify-content-between align-items-center"
                            >
<strong>{s.nom}</strong>
<Link to={`/admin/sandwich/update/${s._id}`}>
<button className="btn btn-outline-secondary">
Mise à jour
   </button>
   </Link>
<button onClick={() => destroy(s._id)}
className="btn btn-outline-danger"> Supprimer

</button>
</li>
))}
</ul>
<br />
</div>
</div>
</Layout2>
    );
};

export default GererCarteSandwich;