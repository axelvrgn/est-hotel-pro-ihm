import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import { useEffect, useState } from "react";
import { ReservationService } from "../../services/ReservationService";
import { useAuth } from "../../contexts/auth";
import { ReservationChartData } from "../../interfaces/Reservation";
import moment from "moment";

const exampleData = [
  { date: moment().subtract(6, "days").format("DD/MM/YYYY"), count: 2 },
  { date: moment().subtract(5, "days").format("DD/MM/YYYY"), count: 3 },
  { date: moment().subtract(4, "days").format("DD/MM/YYYY"), count: 5 },
  { date: moment().subtract(3, "days").format("DD/MM/YYYY"), count: 1 },
  { date: moment().subtract(2, "days").format("DD/MM/YYYY"), count: 4 },
  { date: moment().subtract(1, "days").format("DD/MM/YYYY"), count: 6 },
  { date: moment().format("DD/MM/YYYY"), count: 7 },
];

const ReservationChart = () => {
  const [reservations, setReservations] =
    useState<{ date: string; count: number }[]>(exampleData);

  const { user } = useAuth();

  useEffect(() => {
    //fetchAllReservationsChart();
  }, []);

  const fetchAllReservationsChart = () => {
    if (user) {
      ReservationService.getAllReservationsForChart(user.token).then((res) => {
        const transformedData = res.data.reduce(
          (
            acc: { date: string; count: number }[],
            reservation: ReservationChartData
          ) => {
            const date = moment(reservation.startDate).format("DD/MM/YYYY");
            const existingDate = acc.find((item) => item.date === date);
            if (existingDate) {
              existingDate.count += 1;
            } else {
              acc.push({ date, count: 1 });
            }
            return acc;
          },
          []
        );
        setReservations(transformedData);
      });
    }
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={reservations}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="count"
          name="Nombre de réservations"
          stroke="#e49b0e"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ReservationChart;
