export interface IAppUser {
    "@odata.etag": string;
    overwritetime: string;
    applicationname: string;
    solutionid: string;
    componentidunique: string;
    statecode: number;
    statuscode: number;
    ismanaged: boolean;
    applicationtype: number;
    componentstate: number;
    modifiedon: string;
    applicationid: string;
    _modifiedby_value: string;
    canimpersonateassystemuser: boolean;
    createdon: string;
    versionnumber: number;
    applicationuserid: string;
    _businessunitid_value: string;
    _createdby_value: string;
    overriddencreatedon: string | null;
    importsequencenumber: number | null;
    _modifiedonbehalfby_value: string | null;
    utcconversiontimezonecode: number | null;
    _createdonbehalfby_value: string | null;
    timezoneruleversionnumber: number | null;
    iscustomizable: {
        Value: boolean;
        CanBeChanged: boolean;
        ManagedPropertyLogicalName: string;
    };
}