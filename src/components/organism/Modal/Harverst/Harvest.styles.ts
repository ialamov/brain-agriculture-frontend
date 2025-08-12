import styled from "@emotion/styled";

const Overlay = styled.div`
  position:fixed; 
  inset:0; 
  display:flex; 
  align-items:center; 
  justify-content:center; 
  background:rgba(0,0,0,.4); 
  z-index:1000;
`;

const Dialog = styled.form`
  width:100%; 
  max-width:640px; 
  background:#fff; 
  border:1px solid #E5E7EB; 
  border-radius:16px; 
  box-shadow:0 6px 24px rgba(0,0,0,.18); 
  display:grid;
  grid-template-rows:auto 1fr auto;
`;

const Head = styled.div`
  padding:16px 20px; 
  border-bottom:1px solid #E5E7EB; 
  display:flex; align-items:center; 
  justify-content:space-between; 
  h2{
    margin:0;
    font-size:18px;
    color:#1B4332;
  }
}`;

const Body = styled.div`
  padding:20px; 
  display:grid; 
  gap:14px;
`;

const Row2 = styled.div`
  display:grid; 
  grid-template-columns:1fr 1fr; 
  gap:12px;
`;

const Row3 = styled.div`
  display:grid; 
  grid-template-columns:1fr 1fr 1fr; 
  gap:12px;
`;

const Field = styled.div`
  display:grid; 
  gap:8px;
`;

const Label = styled.label`
  font-size:14px; 
  color:#2f3a33;
`;

const Input = styled.input`
  height:44px; 
  padding:0 12px; 
  border:1px solid #E5E7EB; 
  border-radius:10px; 
  font-size:16px; 
  &:focus{
    outline:none;border-color:#2D6A4F;
    box-shadow:0 0 0 3px rgba(45,106,79,0.16);
  }
`;

const Select = styled.select`
  height:44px; 
  padding:0 12px; 
  border:1px solid #E5E7EB; 
  border-radius:10px; 
  font-size:16px; 
  &:focus{
    outline:none;border-color:#2D6A4F;
    box-shadow:0 0 0 3px rgba(45,106,79,0.16);
  } 
`;

const Textarea = styled.textarea`
  height:84px; 
  padding:10px 12px; 
  border:1px solid #E5E7EB; 
  border-radius:10px; 
  font-size:16px; 
  resize:vertical; 
  &:focus{
    outline:none;border-color:#2D6A4F;
    box-shadow:0 0 0 3px rgba(45,106,79,0.16);
  } 
`;

const Error = styled.small`
  color:#D9534F;
`;

const Foot = styled.div`
  padding:16px 20px; 
  border-top:1px solid #E5E7EB; 
  display:flex; 
  gap:12px;   
  justify-content:flex-end;
`;

const Btn = styled.button<{
  variant?:'secondary'
}>`
  height:44px; 
  border:none; 
  border-radius:10px; 
  font-weight:600; 
  cursor:pointer; 
  padding:0 14px; 
  background:${p=>p.variant==='secondary'?'#E9ECEF':'#2D6A4F'}; 
  color:${p=>p.variant==='secondary'?'#243127':'#fff'}; 
  &:disabled{
    opacity:.6;
    cursor:not-allowed;
  }
`;

export { Overlay, Dialog, Head, Body, Row2, Row3, Field, Label, Input, Select, Textarea, Error, Foot, Btn };