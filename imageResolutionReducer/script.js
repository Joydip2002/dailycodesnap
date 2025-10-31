let img=new Image(),origSize=0;
file.onchange=e=>{
  const f=e.target.files[0]; if(!f)return;
  origSize=(f.size/1024).toFixed(1);
  const r=new FileReader();
  r.onload=()=>{img.src=preview.src=r.result; preview.style.display="block";
  sizeInfo.textContent=`Original: ${origSize} KB`;}
  r.readAsDataURL(f);
};
quality.oninput=()=>qVal.textContent=quality.value;
download.onclick=()=>{
  const c=document.createElement("canvas");
  c.width=img.width; c.height=img.height;
  c.getContext("2d").drawImage(img,0,0,c.width,c.height);
  const q=parseFloat(quality.value);
  const data=c.toDataURL("image/jpeg",q);
  const newSize=(Math.round((data.length*3/4)/1024));
  sizeInfo.textContent=`Original: ${origSize} KB → New: ${newSize} KB`;
  const a=document.createElement("a");
  a.href=data; a.download="reduced.jpg"; a.click();
};



















