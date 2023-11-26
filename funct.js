function checkWebgl(canvas){

    let contexts = ["webgl2","webgl", "experimental-webgl", "webkit-3d", "moz-webgl"]
    for (var i=0; i < contexts.length; i++) {
        try {
            gl = canvas.getContext(contexts[i]);
        } catch(e) {}
        if (gl) {
            break;
        }
    }
    if(!gl){console.log("WebGL not available, sorry! Please use a new version of Chrome or Firefox."); return;}
    return gl;
}

function shader_Program(gl_,vert_shad_text,frag_shad_text){
    
    const vert_shader = gl_.createShader(gl_.VERTEX_SHADER);
    gl_.shaderSource(vert_shader, vert_shad_text);
    gl_.compileShader(vert_shader);
    console.log(gl_.getShaderInfoLog(vert_shader));
    
    const frag_shader = gl_.createShader(gl_.FRAGMENT_SHADER);
    gl_.shaderSource(frag_shader, frag_shad_text);
    gl_.compileShader(frag_shader);
    console.log(gl_.getShaderInfoLog(frag_shader));

    const program  = gl_.createProgram();
    gl_.attachShader(program,vert_shader);
    gl_.attachShader(program,frag_shader);
    gl_.linkProgram(program);

    return [vert_shader, frag_shader];
}

function link_shaders(gl_,comp_shad){
    const program = gl_.createProgram();
    gl_.attachShader(program, comp_shad[0]);
    gl_.attachShader(program, comp_shad[1]);
    gl_.linkProgram(program);
    return program;
}

function perspective(out, fovy, aspect, near, far){
    let f = 1.0 / Math.tan(fovy / 2),
    nf;
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;
    if (far != null && far !== Infinity) {
      nf = 1 / (near - far);
      out[10] = (far + near) * nf;
      out[14] = 2 * far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -2 * near;
    }
    return out;
}

function degToRad(d) {
    return d * Math.PI / 180;
}

function lookAt(out , eye, center, up){
    let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
    let eyex = eye[0];
    let eyey = eye[1];
    let eyez = eye[2];
    let upx = up[0];
    let upy = up[1];
    let upz = up[2];
    let centerx = center[0];
    let centery = center[1];
    let centerz = center[2];
    if (
      Math.abs(eyex - centerx) < 0.000001 &&
      Math.abs(eyey - centery) < 0.000001 &&
      Math.abs(eyez - centerz) < 0.000001
    ) {
      return identity(out);
    }
    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;
    len = 1 / Math.hypot(z0, z1, z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;
    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.hypot(x0, x1, x2);
    if (!len) {
      x0 = 0;
      x1 = 0;
      x2 = 0;
    } else {
      len = 1 / len;
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }
    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;
    len = Math.hypot(y0, y1, y2);
    if (!len) {
      y0 = 0;
      y1 = 0;
      y2 = 0;
    } else {
      len = 1 / len;
      y0 *= len;
      y1 *= len;
      y2 *= len;
    }
    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;
    return out;

}

function targetTo(out, eye, target, up){
    let eyex = eye[0],
    eyey = eye[1],
    eyez = eye[2],
    upx = up[0],
    upy = up[1],
    upz = up[2];
  let z0 = eyex - target[0],
    z1 = eyey - target[1],
    z2 = eyez - target[2];
  let len = z0 * z0 + z1 * z1 + z2 * z2;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }
  let x0 = upy * z2 - upz * z1,
    x1 = upz * z0 - upx * z2,
    x2 = upx * z1 - upy * z0;
  len = x0 * x0 + x1 * x1 + x2 * x2;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }
  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
}

function translate(out, a, v){
    let x = v[0],
      y = v[1],
      z = v[2];
    let a00, a01, a02, a03;
    let a10, a11, a12, a13;
    let a20, a21, a22, a23;
    if (a === out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11];
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a03;
      out[4] = a10;
      out[5] = a11;
      out[6] = a12;
      out[7] = a13;
      out[8] = a20;
      out[9] = a21;
      out[10] = a22;
      out[11] = a23;
      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }
    return out;
  
}

function create_buffer(gl_,data){
    const buffer = gl_.createBuffer();
    gl_.bindBuffer(gl_.ARRAY_BUFFER,buffer);
    gl_.bufferData(gl_.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);
    return buffer;
}

function rotate(out, a, rad, axis){
    let x = axis[0],
    y = axis[1],
    z = axis[2];
    let len = Math.hypot(x, y, z);
    let s, c, t;
    let a00, a01, a02, a03;
    let a10, a11, a12, a13;
    let a20, a21, a22, a23;
    let b00, b01, b02;
    let b10, b11, b12;
    let b20, b21, b22;
    if (len < 0.000001) {
      return null;
    }
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    // Construct the elements of the rotation matrix
    b00 = x * x * t + c;
    b01 = y * x * t + z * s;
    b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;
    b11 = y * y * t + c;
    b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;
    b21 = y * z * t - x * s;
    b22 = z * z * t + c;
    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;
    if (a !== out) {
      // If the source and destination differ, copy the unchanged last row
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    return out;
}

function check_zero(a){
    for(let g =0; g<a.length; g++){
        a[g] = String(a[g]);
        for(let b =0; b<a[g].length; b++){
            if(a[g][b] == 'e' )
            { a[g]=0; break; }
        }
        a[g] = Number(a[g]);
    }
    return a;
}

function find_point(dir ,a){
    let c = [];
    c[0] = dir[0] + a[0];
    c[1] = dir[1] + a[1];
    c[2] = dir[2] + a[2];
    return c;
}

function transpose(out, a){
    if (out === a) {
        let a01 = a[1],
          a02 = a[2],
          a03 = a[3];
        let a12 = a[6],
          a13 = a[7];
        let a23 = a[11];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
      } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
      }
      return out;
}

function cross(out, a, b){
    let ax = a[0],
    ay = a[1],
    az = a[2];
  let bx = b[0],
    by = b[1],
    bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}

function normalize(out, a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    let len = x * x + y * y + z * z;
    if (len > 0) {
      //TODO: evaluate use of glm_invsqrt here?
      len = 1 / Math.sqrt(len);
    }
    out[0] = a[0] * len;
    out[1] = a[1] * len;
    out[2] = a[2] * len;
    return out;
}

// unif data [mat/false, 1/2/3/4, f/i, v/false] ,location, value
function unif_type_data(gl_, matrix, num, tr_type, vec, locat, value){
    if(matrix == false){
        if(num ==1 && tr_type == f && vec == false)
        { gl_.uniform1f(locat, value); }
        if(num ==1 && tr_type == f && vec == v)
        { gl_.uniform1fv(locat, value); }
        if(num ==1 && tr_type == i && vec == false)
        { gl_.uniform1i(locat, value); }
        if(num ==1 && tr_type == i && vec == v)
        { gl_.uniform1iv(locat, value); }

        if(num ==2 && tr_type == f && vec == false)
        { gl_.uniform2f(locat, value[0], value[1]); }
        if(num ==2 && tr_type == f && vec == v)
        { gl_.uniform2fv(locat, value); }
        if(num ==2 && tr_type == i && vec == false)
        { gl_.uniform2i(locat, value[0], value[1]); }
        if(num ==2 && tr_type == i && vec == v)
        { gl_.uniform2iv(locat, value); }

        if(num ==3 && tr_type == f && vec == false)
        { gl_.uniform3f(locat, value[0], value[1], value[2]); }
        if(num ==3 && tr_type == f && vec == v)
        { gl_.uniform3fv(locat, value); }
        if(num ==3 && tr_type == i && vec == false)
        { gl_.uniform3i(locat, value[0], value[1], value[2]); }
        if(num ==3 && tr_type == i && vec == v)
        { gl_.uniform3iv(locat, value); }

        if(num ==4 && tr_type == f && vec == false)
        { gl_.uniform4f(locat, value[0], value[1], value[2], value[3]); }
        if(num ==4 && tr_type == f && vec == v)
        { gl_.uniform4fv(locat, value); }
        if(num ==4 && tr_type == i && vec == false)
        { gl_.uniform4i(locat, value[0], value[1], value[2], value[3]); }
        if(num ==4 && tr_type == i && vec == v)
        { gl_.uniform4iv(locat, value); }

    }else{
        
        if(num == 2)
        { gl_.uniformMatrix2fv(locat, false, value) }
        if(num == 3)
        { gl_.uniformMatrix3fv(locat, false, value) }
        if(num == 4)
        { gl_.uniformMatrix4fv(locat, false, value) }

    }
}

//                         'gl_.LINES',           1
// var mode_drawing={      'gl_.POINTS',          0
//                         'gl_.LINE_LOOP',       2
//                         'gl_.LINE_STRIP',      3
//                         'gl_.TRIANGLES',       4
//                         'gl_.TRIANGLE_STRIP',  5
//                         'gl_.TRIANGLE_FAN'     6
//     };
function draw(gl_, buffer, prog, attri, attri_data, textu, unif, unif_data, unif_ty_data, numofPoints, modeNumber){
    gl_.bindBuffer(gl.ARRAY_BUFFER,buffer);
    let attributes=[];
    for(let i = 0; i<attri.length;i++){
        attributes[i] = gl_.getAttribLocation(prog, attri[i]);
        gl_.vertexAttribPointer( attributes[i], 4, gl_.FLOAT, false, attri_data[i][0] * Float32Array.BYTES_PER_ELEMENT, attri_data[i][1] * Float32Array.BYTES_PER_ELEMENT);
        gl_.enableVertexAttribArray(attributes[i]);
    }
    gl_.useProgram(prog);

    let textures=[];
    if(textu !== false){
      for(let k = 0; k<textu.length; k++){
        textures[k] = gl_.getUniformLocation(prog, textu[k]);
        gl_.uniform1i(textures[k] , 0);
      }
    }
    
    if(unif !== false){
        
        let uniforms =[];
        for(let j = 0; j<unif.length; j++){
            uniforms[j] = gl_.getUniformLocation( prog, unif[j] );
            unif_type_data(gl_,unif_ty_data[0], unif_ty_data[1], unif_ty_data[2], unif_ty_data[3], uniforms[j], unif_data[j]);
                 }
    }

    gl_.drawArrays(Number(modeNumber), 0, numofPoints);
}

function vec3_rotateY(out, a, b, rad){
  let p = [],
    r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  //perform rotation
  r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad);
  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}

function vec3_rotateZ(out, a, b, rad) {
  let p = [],
    r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  //perform rotation
  r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
  r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
  r[2] = p[2];
  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}

function vec3_rotateX(out, a, b, rad) {
  let p = [],
    r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  //perform rotation
  r[0] = p[0];
  r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
  r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad);
  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}

function circle_points_Y(r, gap){
  // console.log(r,gap);
  let point =[];
  let a=[0,0,0];
  // let b = [r,0,0];
  // console.log(b)
  for(let i=0;i<360;i=i+gap){
    vec3_rotateY(a,[r,0,0],[0,0,0],degToRad(i));
    point.push(a[0],a[1],a[2],1);
  }
  point = check_zero(point);

  return point;
}

function circle_points_Z(r, gap){
  // console.log(r,gap);
  let point =[];
  let a=[0,0,0];
  // let b = [r,0,0];
  // console.log(b)
  for(let i=0;i<360;i=i+gap){
    vec3_rotateZ(a,[r,0,0],[0,0,0],degToRad(i));
    point.push(a[0],a[1],a[2],1);
  }
  point = check_zero(point);

  return point;
}

function circle_points_X(r, gap){
  // console.log(r,gap);
  let point =[];
  let a=[0,0,0];
  // let b = [r,0,0];
  // console.log(b)
  for(let i=0;i<360;i=i+gap){
    vec3_rotateZ(a,[0,r,0],[0,0,0],degToRad(i));
    point.push(a[0],a[1],a[2],1);
  }
  point = check_zero(point);

  return point;
}