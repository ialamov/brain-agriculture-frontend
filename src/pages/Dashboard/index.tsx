import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFarms } from "../../store/farm/thunks";
import { fetchHarvests } from "../../store/harvest/thunk";
import { fetchCrops } from "../../store/crop/thunk";  
import { selectTotals } from "../../store/selectors/dashboards";
import { selectFarmsByStateData } from "../../store/selectors/dashboards";
import { selectCropsByNameData } from "../../store/selectors/dashboards";
import { selectLandUseData } from "../../store/selectors/dashboards";
import { Wrap, Cards, Card, Label, Value, Grid, COLORS, Panel } from "./Dashboard.styles.tsx";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function DashboardPage(){      
  const dispatch = useDispatch<any>();
  useEffect(()=>{ dispatch(fetchFarms({ page:1, pageSize:500 })); dispatch(fetchHarvests({ page:1, pageSize:500 })); dispatch(fetchCrops({ page:1, pageSize:1000 })); }, [dispatch]);

  const totals = useSelector(selectTotals);
  const stateData = useSelector(selectFarmsByStateData);
  const cropData = useSelector(selectCropsByNameData);
  const landUse = useSelector(selectLandUseData);

  return (
    <Wrap>
      {/* <h1 style={{margin:0}}>Dashboard</h1>

      <Cards>
        <Card><Label>Total de fazendas</Label><Value>{totals.totalFarms}</Value></Card>
        <Card><Label>Total de hectares</Label><Value>{totals.totalHa.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}</Value></Card>
        <Card><Label>Culturas distintas</Label><Value>{totals.distinctCrops}</Value></Card>
        <Card><Label>Safras ativas</Label><Value>{totals.totalHarvests}</Value></Card>
      </Cards>

      <Grid>
        <Panel>
          <h3 style={{margin:'6px'}}>Fazendas por estado</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie dataKey="value" data={stateData.labels.map((l,i)=>({ name:l, value: stateData.values[i] }))} outerRadius={110}>
                {stateData.labels.map((_,i)=> <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip /><Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </Panel>

        <Panel>
          <h3 style={{margin:'6px'}}>Culturas plantadas</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie dataKey="value" data={cropData.labels.map((l,i)=>({ name:l, value: cropData.values[i] }))} outerRadius={110}>
                {cropData.labels.map((_,i)=> <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip /><Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </Panel>

        <Panel>
          <h3 style={{margin:'6px'}}>Uso do solo (ha)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie dataKey="value" data={landUse.labels.map((l,i)=>({ name:l, value: landUse.values[i] }))} outerRadius={110}>
                {landUse.labels.map((_,i)=> <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip /><Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </Panel>
      </Grid> */}
    </Wrap>
  );
}