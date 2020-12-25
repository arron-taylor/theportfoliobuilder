import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom"; 
import admin from '../admin.module.css';

export default function Dashboard() {
	return (
		<div className={admin.container}>
			Welcome, here's your dashboard
		</div>
	)
}