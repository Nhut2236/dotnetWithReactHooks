import sendRequest from "../helpers/api";
import React, { useState, useEffect, useContext } from "react";
import {store} from "../store";

// globalStore
const blogStore = store._currentValue;

export async function getList(req){
    let res = await sendRequest({url: "/api/Blog/GetAll",method: 'POST',data: req});
    let { data } = res.data;
    return data;
};

export async function  deleteBlog(req) {
    let res = await sendRequest({url: "/api/Blog/delete", method: 'POST',data: { Ids: req } });
    let { data } = res.data;
    return data; 
};

