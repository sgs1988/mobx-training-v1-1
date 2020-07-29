import { observable, action, computed } from "mobx";
import { ProjectDetailState } from "../model/ProjectDetailsState";
import handleRequest from "../middleware/fetchMiddleware";

import { ProjectDetailsModel } from "../model/newprojectdetailsModel";

export interface IProject {
  fetchAllProjectName(callback?: any): void;
  getState: ProjectDetailState;
}

export class ProjectStore implements IProject {
  constructor(projectState: ProjectDetailState) {
    this.state = projectState;
  }
  @observable
  public state: ProjectDetailState;

  @computed
  public get getState(): ProjectDetailState {
    return this.state;
  }
  @action
  public fetchAllProjectName(callback?: any) {
    if (callback) {
      callback(true);
    }
    const config = {
      path: `/Projects`,
      method: "GET",
      success: (json: any) => this.receiveProjectsData(json),
      
    };
    handleRequest(config);
  }
    private receiveProjectsData(json: Array<ProjectDetailsModel>) {
        console.log("API called");
    this.state.projectDetailData = json;
  }
  // @action
  // public saveSar(sarDetails: any, callback: any, failureCallback: any) {
  //   const config = {
  //     path: `/SiteAssessmentRequest`,
  //     method: "POST",
  //     body: {
  //       CountryId: sarDetails.countryId,
  //       SarNo: sarDetails.sarno,
  //       SiteName: sarDetails.siteName,
  //       Client: sarDetails.client,
  //       IsActive: true,
  //       StartDate: new Date().toISOString(),
  //     },
  //     customErrorMessage: true,
  //     success: (json: any) => {
  //       callback(false);
  //       this.fetchAllSARs();
  //       this.fetchSARSummary();
  //     },
  //     failure: (response: any) => {
  //       failureCallback();
  //     },
  //   };
  //   handleRequest(config);
  // }


  // @action
  // public fetchAllSARs(callback?: any) {
  //   if (callback) {
  //     callback(true);
  //   }
  //   const config = {
  //     path: `/SiteAssessmentRequest/siteassesmentrequests`,
  //     method: "GET",
  //     success: (json: any) => this.receivSARData(json),
  //   };
  //   handleRequest(config);
  // }
  // private receivSARData(json: Array<SarModel>) {
  //   this.state.sarData = json;
  // }

  // // get all Mast
  // @action
  // public fetchAllMasts(SiteAssessmentRequestId: string, callback?: any) {
  //   if (callback) {
  //     callback(true);
  //   }
  //   const config = {
  //     path: `/MastLocation/siteassesmentsrequests/${SiteAssessmentRequestId}/mastlocations`,
  //     method: "GET",
  //     success: (json: any) => this.receiveMastData(json),
  //   };
  //   handleRequest(config);
  // }
  // private receiveMastData(json: Array<MastModel>) {
  //   this.state.mastData = json;
  // }
  // @action
  // public fetchAllCoordinateSystems(searchStr:any, callback?: any) {    
  //   const config = {
  //     path:`/SiteAssessmentRequest/coordinatereferencesystemnames?searchName=` +searchStr, 
  //     method: "GET",
  //     success: (json: any) => {        
  //       this.state.coordinateSystems = json;
  //       callback(this.state.coordinateSystems);
  //     },
  //   };
  //   handleRequest(config);
  // }
  // @action
  // public fetchSARById(sarId: string, callback?: any) {
  //   if (callback) {
  //     callback(true);
  //   }
  //   const config = {
  //     path: `/SiteAssessmentRequest/siteassessmentrequests/${sarId}`,
  //     method: "GET",
  //     success: (json: any) => this.receivSARDetailData(json),
  //   };
  //   handleRequest(config);
  // }
  // private receivSARDetailData(json: SarModel) {
  //   this.state.sarDetail = json;
  // }
  // @action
  // public fetchSARSummary(callback?: any) {
  //   if (callback) {
  //     callback(true);
  //   }
  //   const config = {
  //     path: `/SiteAssessmentRequest/SARSummary`,
  //     method: "GET",
  //     success: (json: any) => this.receivSARSummary(json),
  //   };
  //   handleRequest(config);
  // }
  // private receivSARSummary(json: sarSummary) {
  //   this.state.sarSummary = json;
  // }
}
