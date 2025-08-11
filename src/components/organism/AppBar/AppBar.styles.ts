import styled from '@emotion/styled';

const AppBar = styled.header`
  background: linear-gradient(0deg, rgba(27,67,50,.98), rgba(27,67,50,.98)), #1B4332;
  color:#fff; padding:16px 24px;
  display:flex; align-items:center; justify-content:space-between; gap:12px;
  h1{ margin:0; font-size:18px; letter-spacing:.3px; }
`;
const Actions = styled.div`display:flex; gap:12px; flex-wrap:wrap;`;
const Btn = styled.button<{variant?:'primary'|'secondary'}>`
  height:40px; padding:0 14px; border:none; border-radius:10px; cursor:pointer; font-weight:600;
  background:${p=>p.variant==='secondary' ? '#E9ECEF' : '#2D6A4F'};
  color:${p=>p.variant==='secondary' ? '#243127' : '#fff'};
`;

export { AppBar, Actions, Btn };