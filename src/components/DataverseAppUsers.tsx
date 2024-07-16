import { createTableColumn, DataGrid, DataGridBody, DataGridCell, DataGridHeader, DataGridHeaderCell, DataGridRow, TableColumnDefinition } from "@fluentui/react-components";
import { useDataverse } from "../context/DataverseContext";
import { ODataPagedDataProvider } from "mgwdev-m365-helpers/lib/dal/dataProviders/ODataPagedDataProvider";
import * as React from "react";
import { IAppUser } from "../model/IAppUser";
import { TimeZoneService } from "../services/TimeZoneService";


const appUsersColumns: TableColumnDefinition<IAppUser>[] = [
    createTableColumn<IAppUser>({
        columnId: "applicationname",
        renderHeaderCell: () => "Full Name",
        renderCell: (item) => item.applicationname
    }),
    createTableColumn<IAppUser>({
        columnId: "applicationtype",
        renderHeaderCell: () => "Type",
        renderCell: (item) => item.applicationtype
    }),
    createTableColumn<IAppUser>({
        columnId: "createdon",
        renderHeaderCell: () => "Created",
        renderCell: (item) => TimeZoneService.getRelativeTime(new Date(item.createdon), "en-US")
    }),
]

export const DataverseAppUsers: React.FC = () => {
    const { dataverseClient, dataverseResource } = useDataverse();
    const [data, setData] = React.useState<IAppUser[]>([]);
    const usersProvider = React.useRef(new ODataPagedDataProvider<IAppUser>(dataverseClient, `${dataverseResource}/api/data/v9.2/applicationusers`));
    usersProvider.current.pageSize = 10;
    const getData = async () => {
        const data = await usersProvider.current.getData();
        setData(data);
    }

    React.useEffect(() => {
        getData();
    }, []);
    return <div>
        <h1>Dataverse Test</h1>
        <div>
            <DataGrid
                items={data}
                columns={appUsersColumns}
                sortable
                selectionMode="multiselect"
                getRowId={(item: IAppUser) => item.applicationid}
                focusMode="composite"
                style={{ minWidth: "550px" }}
            >
                <DataGridHeader>
                    <DataGridRow
                        selectionCell={{
                            checkboxIndicator: { "aria-label": "Select all rows" },
                        }}
                    >
                        {({ renderHeaderCell }) => (
                            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                        )}
                    </DataGridRow>
                </DataGridHeader>
                <DataGridBody<IAppUser>>
                    {({ item, rowId }) => (
                        <DataGridRow<IAppUser>
                            key={rowId}
                            selectionCell={{
                                checkboxIndicator: { "aria-label": "Select row" },
                            }}
                        >
                            {({ renderCell }) => (
                                <DataGridCell>{renderCell(item)}</DataGridCell>
                            )}
                        </DataGridRow>
                    )}
                </DataGridBody>
            </DataGrid>
        </div>
    </div>
};
