import React, { useEffect, useRef, useState } from 'react'
import  * as THREE from "three"
import { useInit } from '../hooks/init';
export default function WebGL() {
    const [scene,setScene] = useState<any>();
    const [camera,setCamera] = useState<any>();
    const [renderer ,setRenderer] = useState<any>();
    const [world,setWorld] = useState<any>();
    const isFirst = useRef(true);
    const ref = useRef<any>();
    const init = useInit(ref);
    useEffect(()=>{
            if(isFirst.current){
                isFirst.current=false;
                const {scene,camera,renderer,world} =initThree();
            }
    },[])
    const initThree =() =>{
        const {scene,camera,renderer,world} = init();
        setScene(scene);
        setCamera(camera);
        setRenderer(renderer);
        setWorld(world);
        return {scene,camera,renderer,world}
    }
  return (
    <div style={{width:"100%",height:"100%"}} ref={ref}></div>
  )
}
