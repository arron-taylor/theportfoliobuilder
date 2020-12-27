import admin from '../../admin.module.css';
import { gql, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'

export default function CheckList(props) {
	
	return (
		<div className={admin.CheckList}>
			<div className={admin.header}> 
				<FontAwesomeIcon className={ admin.icon } icon={ faClipboardList } /> Your Checklist
			</div>
			<div className={admin.CheckListItems}>
				<table>
					<tr className={admin.row}>
						<td>
							<div className={admin.CheckListItemCircle} />
						</td>
						<td>
							<div className={admin.CheckListItem}> Select a theme </div>
						</td>
					</tr>
					<tr>
						<td>
							<div className={admin.CheckListItemCircle} />
						</td>
						<td>
							<div className={admin.CheckListItem}> Make your first page </div>
						</td>
					</tr>
					<tr>
						<td>
							<div className={admin.CheckListItemCircle} />
						</td>
						<td>
							<div className={admin.CheckListItem}> Set up data analytics </div>
						</td>
					</tr>
					<tr>
						<td>
							<div className={admin.CheckListItemCircle} />
						</td>
						<td>
							<div className={admin.CheckListItem}> Confirm your settings </div>
						</td>
					</tr>
					<tr>
						<td>
							<div className={admin.CheckListItemCircle} />
						</td>
						<td>
							<div className={admin.CheckListItem}> Set up a blog </div>
						</td>
					</tr>
				</table>
			</div>
		</div>
	)
}