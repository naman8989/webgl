// const points_02 =[
    
//     // POINTS       // COLORS              // NORMAL      // uv
//      -0.25, 0.25, 0.25, 1,   1.0, 0.0, 0.0, 1.0,    
//      -0.25,-0.25, 0.25, 1,   1.0, 0.0, 0.0, 1.0,    
//       0.25,-0.25, 0.25, 1,   1.0, 0.0, 0.0, 1.0,    
//     //  -0.25, 0.25, 0.25, 1,   1.0, 0.0, 0.0, 1.0,    
//     //   0.25,-0.25, 0.25, 1,   1.0, 0.0, 0.0, 1.0,    
//     //   0.25, 0.25, 0.25, 1,   1.0, 0.0, 0.0, 1.0,    

//     //  -0.25, 0.25,-0.25, 1,   1.0, 0.0, 0.0, 1.0,
//     //  -0.25,-0.25,-0.25, 1,   1.0, 0.0, 0.0, 1.0,
//     //   0.25,-0.25,-0.25, 1,   1.0, 0.0, 0.0, 1.0,
//     //  -0.25, 0.25,-0.25, 1,   1.0, 0.0, 0.0, 1.0,  
//     //   0.25,-0.25,-0.25, 1,   1.0, 0.0, 0.0, 1.0,
//     //   0.25, 0.25,-0.25, 1,   1.0, 0.0, 0.0, 1.0,

//     //   0.25, 0.25, 0.25, 1,   0.0, 1.0, 0.0, 1.0,
//     //   0.25,-0.25, 0.25, 1,   0.0, 1.0, 0.0, 1.0,
//     //   0.25,-0.25,-0.25, 1,   0.0, 1.0, 0.0, 1.0,
//     //   0.25, 0.25, 0.25, 1,   0.0, 1.0, 0.0, 1.0,
//     //   0.25,-0.25,-0.25, 1,   0.0, 1.0, 0.0, 1.0,
//     //   0.25, 0.25,-0.25, 1,   0.0, 1.0, 0.0, 1.0,
      
//      -0.25, 0.25, 0.25, 1,   0.0, 1.0, 0.0, 1.0,
//      -0.25,-0.25, 0.25, 1,   0.0, 1.0, 0.0, 1.0,
//      -0.25,-0.25,-0.25, 1,   0.0, 1.0, 0.0, 1.0,
//     //  -0.25, 0.25, 0.25, 1,   0.0, 1.0, 0.0, 1.0,
//     //  -0.25,-0.25,-0.25, 1,   0.0, 1.0, 0.0, 1.0,
//     //  -0.25, 0.25,-0.25, 1,   0.0, 1.0, 0.0, 1.0,

//      -0.25,-0.25, 0.25, 1,   0.0, 0.0, 1.0, 1.0,
//       0.25,-0.25, 0.25, 1,   0.0, 0.0, 1.0, 1.0,
//       0.25,-0.25,-0.25, 1,   0.0, 0.0, 1.0, 1.0,
//     //  -0.25,-0.25, 0.25, 1,   0.0, 0.0, 1.0, 1.0,
//     //   0.25,-0.25,-0.25, 1,   0.0, 0.0, 1.0, 1.0,
//     //  -0.25,-0.25,-0.25, 1,   0.0, 0.0, 1.0, 1.0,
    
//     //  -0.25, 0.25, 0.25, 1,   0.0, 0.0, 1.0, 1.0,
//     //   0.25, 0.25, 0.25, 1,   0.0, 0.0, 1.0, 1.0,
//     //   0.25, 0.25,-0.25, 1,   0.0, 0.0, 1.0, 1.0,
//     //  -0.25, 0.25, 0.25, 1,   0.0, 0.0, 1.0, 1.0,
//     //   0.25, 0.25,-0.25, 1,   0.0, 0.0, 1.0, 1.0,
//     //  -0.25, 0.25,-0.25, 1,   0.0, 0.0, 1.0, 1.0,
      
// ]

const vertex_01 = 
`
attribute vec4 in_position;
attribute vec4 in_color;
// attribute vec4 in_normal;

varying vec4 tran_color;

uniform mat4 modProj;
uniform mat4 modView;
uniform mat4 modWorld;

void main(){
    gl_Position = modProj * modView * modWorld * in_position;
    // gl_Position = modWorld * modView * modProj * in_position;
    // gl_Position = in_position;
    tran_color = in_color;
}

`
const fragment_01 =
`
precision mediump float;

varying vec4 tran_color;

void main(){
    gl_FragColor = tran_color;
}

`


// cone
let cone_height = 0.2;
let cone_number_of_side = 100; // min = 3
let cone_side = 0.1;
const points_05= circle_points_Y(cone_side,360/cone_number_of_side);
let c1,c2,c3;
c1=Math.random();
c2=Math.random();
c3=Math.random();
const points_06 = [];
points_06.push(0,cone_height,0,1);
points_06.push(c1,c2-0.3,c3,1.0);
for(let ju=0; ju<points_05.length; ju=ju+4){
    points_06.push(points_05[ju],points_05[ju+1],points_05[ju+2],points_05[ju+3]);
    points_06.push(c1,c2-0.3,c3,1.0);
}
points_06.push(points_05[0],points_05[1],points_05[2],points_05[3]);
points_06.push(c1,c2-0.3,c3,1.0);
const points_07 = [];
points_07.push(0,0,0,1);
points_07.push(c1,c2,c3,1.0);
for(let ju=0;ju<points_05.length; ju=ju+4){
    points_07.push(points_05[ju],points_05[ju+1],points_05[ju+2],points_05[ju+3]);
    points_07.push(c1,c2,c3,1.0);
}
points_07.push(points_05[0],points_05[1],points_05[2],points_05[3]);
points_07.push(c1,c2,c3,1.0);



// rectangle
const side=0.1;
const points_01 = circle_points_Y(side*Math.sqrt(2),45);
const points_02 = [];
const points_03 = [];
const points_04 = [];
let co1,co2,co3;
co1 = Math.random();
co2 = Math.random();
co3 = Math.random();
for(let ru=0; ru<points_01.length; ru=ru+4){
    points_03.push(points_01[ru],points_01[ru+1]+side,points_01[ru+2],points_01[ru+3]);
    points_03.push(co1,co2,co3,1.0);
    points_03.push(points_01[ru],points_01[ru+1]-side,points_01[ru+2],points_01[ru+3]);
    points_03.push(co1,co2,co3,1.0);   
}
points_03.push(points_01[0],points_01[1]+side,points_01[2],points_01[3]);
points_03.push(co1,co2,co3,1.0);
points_03.push(points_01[0],points_01[1]-side,points_01[2],points_01[3]);
points_03.push(co1,co2,co3,1.0);
points_02.push(0,side,0,1);// layer 1
points_02.push(co1,co2+0.3,co3,1.0);
for(let ru=0; ru<points_01.length; ru=ru+4){
    points_02.push(points_01[ru],points_01[ru+1]+side,points_01[ru+2],points_01[ru+3]);
    points_02.push(co1,co2+0.3,co3,1.0);
}
points_02.push(points_01[0],points_01[1]+side,points_01[2],points_01[3]);
points_02.push(co1,co2+0.3,co3,1.0);
points_04.push(0,-side,0,1);// layer 2
points_04.push(co1,co2+0.3,co3,1.0);
for(let ru=0; ru<points_01.length; ru=ru+4){
    points_04.push(points_01[ru],points_01[ru+1]-side,points_01[ru+2],points_01[ru+3]);
    points_04.push(co1,co2+0.3,co3,1.0);
}
points_04.push(points_01[0],points_01[1]-side,points_01[2],points_01[3]);
points_04.push(co1,co2+0.3,co3,1.0);



// ring
const ring_radius = 0.25 ;
const ring_no_sides = 3; // at least 3
const ring_no_ring =5; // at least 3
const ring_circle_radius = 0.05;
const points_08 = circle_points_Y(ring_radius, 360/ring_no_ring);
const points_09 = [];
const points_10 = []; 
const points_11 = []; 
const points_12 = [];
let cr0 = Math.random();
let cr1 = Math.random();
let cr2 = Math.random();
let temp_out=[]
for(let i=0; i<points_08.length/4; i++){
    points_09[i] = circle_points_Z(ring_circle_radius, 360/ring_no_sides); 
    // rotate
    points_10[i] = [];
    for(let j=0; j<points_09[i].length; j=j+4)
    {
        vec3_rotateY( temp_out , [ points_09[i][j],points_09[i][j+1],points_09[i][j+2] ] , [0,0,0] , degToRad(i*(360/ring_no_ring)) );
        points_10[i][j]=temp_out[0]; points_10[i][j+1]=temp_out[1]; points_10[i][j+2]=temp_out[2];
        points_10[i][j+3] = points_09[i][j+3];

    }
    // transfer
    for(let j=0; j<points_10[i].length; j=j+4){
        points_10[i][j+0] = points_10[i][j+0] + points_08[(i*4)+0];
        points_10[i][j+1] = points_10[i][j+1] + points_08[(i*4)+1];
        points_10[i][j+2] = points_10[i][j+2] + points_08[(i*4)+2];
        points_10[i][j+3] = points_10[i][j+3]; 
    }
}
for(let i=0; i<ring_no_ring; i++){
    points_12[i]=[]
    for(let j=0; j<points_10[i].length; j=j+4){
        points_12[i].push( points_10[i][j],   points_10[i][j+1],   points_10[i][j+2],   points_10[i][j+3] );
        points_12[i].push( cr0,cr1,cr2, 1.0 );

        if( i==ring_no_ring-1 ){
            points_12[i].push( points_10[0][j],   points_10[0][j+1],   points_10[0][j+2],   points_10[0][j+3] );
            points_12[i].push( cr0,cr1,cr2, 1.0 );
        }else{

            points_12[i].push( points_10[i+1][j],   points_10[i+1][j+1],   points_10[i+1][j+2],   points_10[i+1][j+3] );
            points_12[i].push( cr0,cr1,cr2, 1.0 );
        }
        
    }
    points_12[i].push( points_10[i][0],   points_10[i][1],   points_10[i][2],   points_10[i][3] );
    points_12[i].push( cr0,cr1,cr2, 1.0 );

    if(i==ring_no_ring-1){
        points_12[i].push( points_10[0][0],   points_10[0][1],   points_10[0][2],   points_10[0][3] );
        points_12[i].push( cr0,cr1,cr2, 1.0 );
    }else{

        points_12[i].push( points_10[i+1][0],   points_10[i+1][1],   points_10[i+1][2],   points_10[i+1][3] );
        points_12[i].push( cr0,cr1,cr2, 1.0 );
    }
}
for (let i=0; i<points_10.length; i++){
    // console.log(points_10[i].length);
    points_11[i] =[]; 
    for(let j=0; j<points_10[i].length; j=j+4){
        points_11[i].push( points_10[i][j], points_10[i][j+1], points_10[i][j+2], points_10[i][j+3] );
        points_11[i].push( cr0,cr1,cr2, 1.0 );
    }
}



// star
const star_rad_1 = 0.1;
const star_rad_2 = 0.3;
const no_star_point = 5;
const star_thickness = 0.05;
const points_13 = circle_points_Y(star_rad_1, (360/no_star_point) );
const points_14 = circle_points_Y(star_rad_2, (360/no_star_point)/2 );
const points_15 = [];
const points_16 = [];
const points_17 = [];
let cs0 = Math.random();
let cs1 = Math.random();
let cs2 = Math.random();
points_15.push(0,(star_thickness/2),0,1);
points_15.push(cs0,cs1,cs2,1.0);
for(let i=0; i<points_13.length; i=i+4){
    points_15.push(points_13[i],points_13[i+1]+(star_thickness/2),points_13[i+2],points_13[[i+3]])
    points_15.push(cs0,cs1+0.3,cs2,1.0);
}
points_15.push(points_13[0],points_13[1]+(star_thickness/2),points_13[2],points_13[[3]])
points_15.push(cs0,cs1+0.3,cs2,1.0);
points_16.push(0,-(star_thickness/2),0,1);
points_16.push(cs0,cs1,cs2,1.0);
for(let i=0; i<points_13.length; i=i+4){
    points_16.push(points_13[i],points_13[i+1]-(star_thickness/2),points_13[i+2],points_13[[i+3]])
    points_16.push(cs0,cs1+0.3,cs2,1.0);
}
points_16.push(points_13[0],points_13[1]-(star_thickness/2),points_13[2],points_13[3])
points_16.push(cs0,cs1+0.3,cs2,1.0);
for(let i=0; i<no_star_point; i++){
    points_17[i]=[];
    points_17[i].push( points_14[(4+(i*8))], points_14[(4+(i*8))+1], points_14[(4+(i*8))+2], points_14[(4+(i*8))+3])
    points_17[i].push(cs0,cs1+0.3,cs2,1.0);

    points_17[i].push( points_13[(i*4)], points_13[(i*4)+1]+(star_thickness/2), points_13[(i*4)+2], points_13[(i*4)+3] );
    points_17[i].push(cs0,cs1+0.3,cs2,1.0);
    
    points_17[i].push( points_13[(i*4)], points_13[(i*4)+1]-(star_thickness/2), points_13[(i*4)+2], points_13[(i*4)+3] );
    points_17[i].push(cs0,cs1+0.3,cs2,1.0);
    
    if(i==no_star_point-1){
        points_17[i].push( points_13[0], points_13[1]-(star_thickness/2), points_13[2], points_13[3] );
        points_17[i].push(cs0,cs1+0.3,cs2,1.0);

        points_17[i].push( points_13[0], points_13[1]+(star_thickness/2), points_13[2], points_13[3] );
        points_17[i].push(cs0,cs1+0.3,cs2,1.0);      

        points_17[i].push( points_13[(i*4)], points_13[(i*4)+1]+(star_thickness/2), points_13[(i*4)+2], points_13[(i*4)+3] );
        points_17[i].push(cs0,cs1+0.3,cs2,1.0);
   
    
    }else{
        points_17[i].push( points_13[(i*4)+4], points_13[(i*4)+5]-(star_thickness/2), points_13[(i*4)+6], points_13[(i*4)+7] );
        points_17[i].push(cs0,cs1+0.3,cs2,1.0);
        
        points_17[i].push( points_13[(i*4)+4], points_13[(i*4)+5]+(star_thickness/2), points_13[(i*4)+6], points_13[(i*4)+7] );
        points_17[i].push(cs0,cs1+0.3,cs2,1.0);

        points_17[i].push( points_13[(i*4)], points_13[(i*4)+1]+(star_thickness/2), points_13[(i*4)+2], points_13[(i*4)+3] );
        points_17[i].push(cs0,cs1+0.3,cs2,1.0);
    }
}
    

function main(){
    // body
    const body = document.querySelector("body");
    body.style.margin=0;
    body.style.padding=0;

    // canvas_01
    const canvas_01 = document.getElementById('canvas_01');    
    let length;
    if(window.innerHeight >= window.innerWidth){ length = window.innerHeight; }
    else{ length = window.innerWidth; }
    canvas_01.style.margin =0;
    canvas_01.style.padding =0;
    canvas_01.width = window.innerWidth;
    canvas_01.height = window.innerHeight;

    gl = checkWebgl(canvas_01);

    gl.viewport(0.0,0.0,length,length);
    gl.clearColor(1.0,1.0,1.0,1.0);
    gl.enable(gl.DEPTH_TEST);

    let sh_programs = shader_Program(gl, vertex_01, fragment_01);
    let sh_link_prog = link_shaders(gl,sh_programs);

    // texture --> NULL

    // Light Direction --> NULL
    // Brightness --> NULL

    // Projection 
    let proj_mat = [1,0,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,1];
    perspective(proj_mat, degToRad(45), canvas_01.width/canvas_01.height, 0.1,200);
    

    // view Mat
    let view_mat = [1,0,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,1];
    let eye = [0,-1,-5];
    targetTo(view_mat, eye, [0,0,0], [0,1,0]);
    
    



    // cube
    // model 1
    let model_mat_1 = [1,0,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,1];
    let tran_1 = [-1,0,-2];
    translate(model_mat_1, model_mat_1, tran_1);
    let attribute_1 = ['in_position', 'in_color'];
    let attribute_data_1 = [[8,0],[8,4]];
    let unifrom_1 = ['modProj', 'modView','modWorld'];
    let unifrom_data_1 = [proj_mat, view_mat, model_mat_1];
    // unif data [mat/false, 1/2/3/4, f/i, v/false] 
    let uniform_type_data_1 = [true, 4, 'f', 'v'];
    // buffer model_1
    let buffer_1 = create_buffer(gl, points_02);
    // model_2
    let model_mat_2 = [1,0,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,1];
    let tran_2 = [-1,0,-2];
    translate(model_mat_2, model_mat_2, tran_2);
    let attribute_2 = ['in_position', 'in_color'];
    let attribute_data_2 = [[8,0],[8,4]];
    let unifrom_2 = ['modProj', 'modView','modWorld'];
    let unifrom_data_2 = [proj_mat, view_mat, model_mat_2];
    // unif data [mat/false, 1/2/3/4, f/i, v/false] 
    let uniform_type_data_2 = [true, 4, 'f', 'v'];
    // buffer model_1
    let buffer_2 = create_buffer(gl, points_03);
    // model_0
    let model_mat_0 = [1,0,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,1];
    let tran_0 = [-1,0,-2];
    translate(model_mat_0, model_mat_0, tran_0);
    let attribute_0 = ['in_position', 'in_color'];
    let attribute_data_0 = [[8,0],[8,4]];
    let unifrom_0 = ['modProj', 'modView','modWorld'];
    let unifrom_data_0 = [proj_mat, view_mat, model_mat_0];
    // unif data [mat/false, 1/2/3/4, f/i, v/false] 
    let uniform_type_data_0 = [true, 4, 'f', 'v'];
    // buffer model_1
    let buffer_0 = create_buffer(gl, points_04);
    




    // cone
    // model_3
    let model_mat_3 = [1,0,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,1];
    let tran_3 = [1,0,-2];
    translate(model_mat_3, model_mat_3, tran_3);
    let attribute_3 = ['in_position', 'in_color'];
    let attribute_data_3 = [[8,0],[8,4]] ;
    let unifrom_3 = ['modProj', 'modView','modWorld'];
    let unifrom_data_3 = [proj_mat, view_mat, model_mat_3];
    // unif data [mat/false, 1/2/3/4, f/i, v/false] 
    let uniform_type_data_3 = [true, 4, 'f', 'v'];
    // buffer model_1
    let buffer_3 = create_buffer(gl, points_06);
    // model_4
    let model_mat_4 = [1,0,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,1];
    let tran_4 = [1,0,-2];
    translate(model_mat_4, model_mat_4, tran_4);
    let attribute_4 = ['in_position', 'in_color'];
    let attribute_data_4 = [[8,0],[8,4]] ;
    let unifrom_4 = ['modProj', 'modView','modWorld'];
    let unifrom_data_4 = [proj_mat, view_mat, model_mat_4];
    // unif data [mat/false, 1/2/3/4, f/i, v/false] 
    let uniform_type_data_4 = [true, 4, 'f', 'v'];
    // buffer model_1
    let buffer_4 = create_buffer(gl, points_07);



    // ring
    // model_5
    let model_mat_5=[],tran_5=[],attribute_5=[],attribute_data_5=[],unifrom_5=[],unifrom_data_5=[],uniform_type_data_5=[],buffer_5=[];
    for(let i=0; i<points_11.length; i++){
        model_mat_5[i]=[],tran_5[i]=[],attribute_5[i]=[],attribute_data_5[i]=[],unifrom_5[i]=[],unifrom_data_5[i]=[],uniform_type_data_5[i]=[],buffer_5[i]=[];

        model_mat_5[i] = [1,0,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,1];
        tran_5[i] = [0,0,0];
        translate(model_mat_5[i], model_mat_5[i], tran_5[i]);
        attribute_5[i] = ['in_position', 'in_color'];
        attribute_data_5[i] = [[8,0],[8,4]] ;
        unifrom_5[i] = ['modProj', 'modView','modWorld'];
        unifrom_data_5[i] = [proj_mat, view_mat, model_mat_5[i]];
        // unif data [mat/false, 1/2/3/4, f/i, v/false] 
        uniform_type_data_5[i] = [true, 4, 'f', 'v'];
        // buffer model_1
        buffer_5[i] = create_buffer(gl, points_12[i]);
        // buffer_5[i] = create_buffer(gl, points_11[i]);
    }


    
    // star
    // model_6
    let model_mat_6 = [1,0,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,1];
    let tran_6 = [0,0,-4];
    translate(model_mat_6, model_mat_6, tran_6);
    let attribute_6 = ['in_position', 'in_color'];
    let attribute_data_6 = [[8,0],[8,4]] ;
    let unifrom_6 = ['modProj', 'modView','modWorld'];
    let unifrom_data_6 = [proj_mat, view_mat, model_mat_6];
    // unif data [mat/false, 1/2/3/4, f/i, v/false] 
    let uniform_type_data_6 = [true, 4, 'f', 'v'];
    // buffer model_1
    let buffer_6 = create_buffer(gl, points_15);
    // model_7
    let model_mat_7 = [1,0,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,1];
    let tran_7 = [0,0,-4];
    translate(model_mat_7, model_mat_7, tran_7);
    let attribute_7 = ['in_position', 'in_color'];
    let attribute_data_7 = [[8,0],[8,4]] ;
    let unifrom_7 = ['modProj', 'modView','modWorld'];
    let unifrom_data_7 = [proj_mat, view_mat, model_mat_7];
    // unif data [mat/false, 1/2/3/4, f/i, v/false] 
    let uniform_type_data_7 = [true, 4, 'f', 'v'];
    // buffer model_1
    let buffer_7 = create_buffer(gl, points_16);
    // model_8
    let model_mat_8=[], tran_8=[],attribute_8=[], attribute_data_8=[], unifrom_8=[],unifrom_data_8=[];uniform_type_data_8=[];buffer_8=[]; 
    for(let i=0; i<no_star_point; i++){
        model_mat_8[i] = [1,0,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,1];
        tran_8[i] = [0,0,-4];
        translate(model_mat_8[i], model_mat_8[i], tran_8[i]);
        attribute_8[i] = ['in_position', 'in_color'];
        attribute_data_8[i] = [[8,0],[8,4]] ;
        unifrom_8[i] = ['modProj', 'modView','modWorld'];
        unifrom_data_8[i] = [proj_mat, view_mat, model_mat_8[i]];
        // unif data [mat/false, 1/2/3/4, f/i, v/false] 
        uniform_type_data_8[i] = [true, 4, 'f', 'v'];
        // buffer model_1
        buffer_8[i] = create_buffer(gl, points_17[i]);
    }
        

    function loop(){
        
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

        // cube
        // model_0
        rotate(model_mat_0,model_mat_0, degToRad(1), [1,1,0]);
        draw(gl, buffer_0, sh_link_prog, attribute_0, attribute_data_0, false, unifrom_0, unifrom_data_0, uniform_type_data_0, points_04.length/8, 6);
        // model_1
        rotate(model_mat_1,model_mat_1, degToRad(1), [1,1,0]);
        draw(gl, buffer_1, sh_link_prog, attribute_1, attribute_data_1, false, unifrom_1, unifrom_data_1, uniform_type_data_1, points_02.length/8, 6);
        // model_2
        rotate(model_mat_2,model_mat_2, degToRad(1),[1,1,0]);
        draw(gl, buffer_2, sh_link_prog, attribute_2, attribute_data_2, false, unifrom_2, unifrom_data_2, uniform_type_data_2, points_03.length/8, 5);



        // cone
        // model_3
        rotate(model_mat_3, model_mat_3, degToRad(1), [1,1,0]);
        draw(gl, buffer_3, sh_link_prog, attribute_3, attribute_data_3, false, unifrom_3, unifrom_data_3, uniform_type_data_3, points_06.length/8,6);
        // model_4
        rotate(model_mat_4, model_mat_4, degToRad(1), [1,1,0]);
        draw(gl, buffer_4, sh_link_prog, attribute_4, attribute_data_4, false, unifrom_4, unifrom_data_4, uniform_type_data_4, points_07.length/8,6);
        

        // ring
        for(let i=0; i<points_12.length; i++){
            rotate(model_mat_5[i], model_mat_5[i], degToRad(1), [1,0,0]);
            draw(gl, buffer_5[i], sh_link_prog, attribute_5[i], attribute_data_5[i], false, unifrom_5[i], unifrom_data_5[i], uniform_type_data_5[i], points_12[i].length/8,5);
        }
        // for(let i=0; i<points_11.length; i++){
        //     rotate(model_mat_5[i], model_mat_5[i], degToRad(1), [1,0,0]);
        //     draw(gl, buffer_5[i], sh_link_prog, attribute_5[i], attribute_data_5[i], false, unifrom_5[i], unifrom_data_5[i], uniform_type_data_5[i], points_11[i].length/8,2);
        // }

        
        // star
        rotate(model_mat_6, model_mat_6, degToRad(1), [1,0,0]);
        draw(gl, buffer_6, sh_link_prog, attribute_6, attribute_data_6, false, unifrom_6, unifrom_data_6, uniform_type_data_6, points_15.length/8,6);
        rotate(model_mat_7, model_mat_7, degToRad(1), [1,0,0]);
        draw(gl, buffer_7, sh_link_prog, attribute_7, attribute_data_7, false, unifrom_7, unifrom_data_7, uniform_type_data_7, points_16.length/8,6);
        for(let i=0; i<no_star_point; i++){
            rotate(model_mat_8[i], model_mat_8[i], degToRad(1), [1,0,0]);
            draw(gl, buffer_8[i], sh_link_prog, attribute_8[i], attribute_data_8[i], false, unifrom_8[i], unifrom_data_8[i], uniform_type_data_8[i], points_17[i].length/8,6);
        }
        

        // rotate camera
            // rotate(view_mat, view_mat, degToRad(1), [0,1,0]);
            
        
        


        requestAnimationFrame(loop);
    }

    
    document.addEventListener('keypress', inc);
    function inc(e){

        if (e.key == 'x' ){ rotate(proj_mat, proj_mat, degToRad(1), [ proj_mat[0], proj_mat[1], proj_mat[2] ]) }
        if (e.key == 'X' && e.shiftKey == true){rotate(proj_mat, proj_mat, degToRad(-3), [ proj_mat[0], proj_mat[1], proj_mat[2] ]);}

        if (e.keyCode == 121 ){ rotate(proj_mat, proj_mat, degToRad(3), [ proj_mat[4], proj_mat[5], proj_mat[6] ])}
        if (e.key == 'Y' && e.shiftKey == true){rotate(proj_mat, proj_mat, degToRad(-3), [ proj_mat[4], proj_mat[5], proj_mat[6] ]);}

        if (e.keyCode == 122 ){rotate(proj_mat, proj_mat, degToRad(3), [ proj_mat[8], proj_mat[9], proj_mat[10] ])}
        if (e.key == 'Z' && e.shiftKey == true){rotate(proj_mat, proj_mat, degToRad(-3), [ proj_mat[8], proj_mat[9], proj_mat[10] ]);}

        if(e.key == 'w'){ translate(view_mat, view_mat,[ proj_mat[8]/5,(-1)* proj_mat[9]/5, proj_mat[10]/5 ]); }
        if(e.key == 's'){ translate(view_mat, view_mat,[ (-1)* proj_mat[8]/5,  proj_mat[9]/5, (-1)* proj_mat[10]/5 ]); }
        if(e.key == 'd'){ translate(view_mat, view_mat,[ proj_mat[5]/5, proj_mat[6]/5,  proj_mat[7]/5 ]); }
        if(e.key == 'a'){ translate(view_mat, view_mat,[ (-1) * proj_mat[5]/5, (-1)* proj_mat[6]/5, (-1)* proj_mat[7]/5 ]); }
        
        if(e.key == 'j'){ translate(view_mat, view_mat, [0,0,1]); }
        if(e.key == 'k'){ rotate(view_mat, view_mat, degToRad(1), [0,1,0]); }
    }

    requestAnimationFrame(loop);

}

main();