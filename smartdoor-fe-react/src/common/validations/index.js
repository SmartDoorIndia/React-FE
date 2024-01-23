/** @format */

// import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import ValidationMessages from '../helpers/ValidationMessages';
import validateRegex from '../helpers/ValidateRegex';

function isBlank(str) {
  return !str || /^\s*$/.test(str);
}

export const validateNewLeadEntry = (data) => {
  const errors = {};

  if (isBlank(data.address)) {
    errors.address = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.contactNumber)) {
    errors.contactNumber = ValidationMessages.fieldRequired.required;
  } else if (!isBlank(data.contactNumber)) {
    if (data.contactNumber.length !== 10) {
      errors.contactNumber = ValidationMessages.phoneNumber.invalid;
    }
  }
  if (isBlank(data.contactPerson)) {
    errors.contactPerson = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.societyName)) {
    errors.societyName = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.leadFor)) {
    errors.leadFor = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.city)) {
    errors.city = ValidationMessages.fieldRequired.required;
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export const validateNewPlan = (data) =>{
  const errors = {};

  if (isBlank(data.TNC)) {
    errors.TNC = ValidationMessages.fieldRequired.required;
  }


  if (isBlank(data.description)) {
    errors.description = ValidationMessages.fieldRequired.required;
  }   
  if (isBlank(data.gstValue)) {
    errors.gstValue = ValidationMessages.fieldRequired.required;
  }      
  if (isBlank(data.planName)) {
    errors.planName = ValidationMessages.fieldRequired.required;
  }   
  if (isBlank(data.subscriptionMonth)) {
    errors.subscriptionMonth = ValidationMessages.fieldRequired.required;
  }   
  if (isBlank(data.isDeviceCamera)) {
    errors.isDeviceCamera = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.isDeviceDongle)) {
    errors.isDeviceDongle = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.isDeviceHub)) {
    errors.isDeviceHub = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.isDeviceSensor)) {
    errors.isDeviceSensor = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.isDeviceSmartLock)) {
    errors.isDeviceSmartLock = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.isLeadGeneration)) {
    errors.isLeadGeneration = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.isMarketingVideo)) {
    errors.isMarketingVideo = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.isMarketingSupport)) {
    errors.isMarketingSupport = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.isAutoDoorCloser)) {
    errors.isAutoDoorCloser = ValidationMessages.fieldRequired.required;
  }


  if(data.planHirarchy < 0 ){
    errors.planHirarchy = ValidationMessages.negativeNumber.invalid;
  }
  
  if(data.depositeAmount < 0 ){
    errors.depositeAmount = ValidationMessages.negativeNumber.invalid;
  }

  if(data.subscriptionMonth < 0 ){
    errors.subscriptionMonth = ValidationMessages.negativeNumber.invalid;
  }

  if(data.installationCharges < 0 ){
    errors.installationCharges = ValidationMessages.negativeNumber.invalid;
  }
  if(data.baseRentalCoins < 0 ){
    errors.baseRentalCoins = ValidationMessages.negativeNumber.invalid;
  }

  if(data.renewalCoins < 0 ){
    errors.baseRentalCoins = ValidationMessages.negativeNumber.invalid;
  }

  if(data.renewalInterval < 0 ){
    errors.renewalInterval = ValidationMessages.negativeNumber.invalid;
  }

  if(data.gstValue <=0 ){
    errors.gstValue = ValidationMessages.negativeNumber.invalid;
  }
  if (isBlank(data.gstValue)) {
    errors.gstValue = ValidationMessages.fieldRequired.required;
  }

  if(isBlank(data.imageLocation)) {
    errors.imageLocation = "Image required"
  }

  // if (isBlank(data.amount)) {
  //   errors.amount = ValidationMessages.fieldRequired.required;
  // } 

  console.log("Erros: ",errors)

  return {
    errors,
    isValid: isEmpty(errors),
  };
}


export const validateNewTeamMember = (data) => {
  const errors = {};

  if (isBlank(data.dob)) {
    errors.dob = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.email)) {
    errors.email = ValidationMessages.fieldRequired.required;
  } else if (!isBlank(data.email)) {
    if (!validateRegex.validateEmail.test(String(data.email).toLowerCase())) {
      errors.email = ValidationMessages.email.invalid;
    }
  }
  if (isBlank(data.executiveName)) {
    errors.executiveName = ValidationMessages.fieldRequired.required;
  }
  if (!(data.post==='1')) {
    errors.city = ValidationMessages.fieldRequired.required;
  }
  console.log(data,"ddddddddddddddddddddddddddd")
  
  if ( !(data.post==='3' || data.post==='7' || data.post==='8' || data.post==='10' || data.post==='13' || data.post==='14' || data.post==='16' ||  data.post==='1' || (data.post.toLowerCase().includes("admin"))) && data.location.length < 1) {
    errors.location = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.post)) {
    errors.post = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.phoneNumber)) {
    errors.phoneNumber = ValidationMessages.fieldRequired.required;
  } else if (!isBlank(data.phoneNumber)) {
    if (data.phoneNumber.length !== 10) {
      errors.phoneNumber = ValidationMessages.phoneNumber.invalid;
    }
  }
  if (!isBlank(data.alternatePhoneNumber)) {
    if (data.alternatePhoneNumber.length !== 10) {
      errors.alternatePhoneNumber = ValidationMessages.phoneNumber.invalid;
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export const validateNewSociety = (data) => {
  const errors = {};

  console.log('Vdata', data);
  if (isBlank(data.newSocietyName)) {
    errors.societyName = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.newAddress)) {
    errors.address = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.plotSize)) {
    errors.plotSize = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.listedProperties.toString())) {
    errors.listedProperties = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.userName)) {
    errors.userName = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.position.toString())) {
    errors.position = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.phoneNumber)) {
    errors.phoneNumber = ValidationMessages.fieldRequired.required;
  } else if (!isBlank(data.phoneNumber)) {
    if (data.phoneNumber.length !== 10) {
      errors.phoneNumber = ValidationMessages.phoneNumber.invalid;
    }
  }
  // if (isBlank(data.proposedCutOff)) {
  //   errors.proposedCutOff = ValidationMessages.fieldRequired.required;
  // }
  if (isBlank(data.city)) {
    errors.city = ValidationMessages.fieldRequired.required;
  }
  // if (isBlank(data.bankName)) {
  //   errors.bankName = ValidationMessages.fieldRequired.required;
  // }
  if (!isBlank(data.accountNumber)) {
    if (data.accountNumber.length > 30) {
      errors.accountNumber = ValidationMessages.accountNumber.invalid;
    }
  }
  if (!isBlank(data.panNumber)) {
    if (!validateRegex.validatePAN.test(data.panNumber)) {
      errors.panNumber = ValidationMessages.panNumber.invalid;
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export const validateNewProperty = (data) => {
  const errors = {};

  console.log('Vdata', data);
  if (isBlank(data.propertyAddressRequest.city)) {
    errors.city = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.propertyAddressRequest.buildingProjectSociety)) {
    errors.buildingProjectSociety = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.propertyBasicDetailRequest.propertyCategory)) {
    errors.propertyCategory = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.propertyBasicDetailRequest.propertyType)) {
    errors.propertyType = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.propertyBasicDetailRequest.propertySubType)) {
    errors.propertySubType = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.propertyBasicDetailRequest.propertyAge)) {
    errors.propertyAge = ValidationMessages.fieldRequired.required;
  }
  // ___________________________________________
  if (isBlank(data.propertyBasicDetailRequest.bedRooms)) {
    errors.bedRooms = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.propertyBasicDetailRequest.hall)) {
    errors.hall = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.propertyBasicDetailRequest.kitchen)) {
    errors.kitchen = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.propertyBasicDetailRequest.numberOfBaths)) {
    errors.numberOfBaths = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.propertyBasicDetailRequest.balcony)) {
    errors.balcony = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.propertyBasicDetailRequest.coveredParking)) {
    errors.coveredParking = ValidationMessages.fieldRequired.required;
  }
  // ___________________________________________
  if (isBlank(data.propertyBasicDetailRequest.openParking)) {
    errors.openParking = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.propertyBasicDetailRequest.type)) {
    errors.type = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.propertyBasicDetailRequest.propertyRate)) {
    errors.propertyRate = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.propertyBasicDetailRequest.maintenanceCost)) {
    errors.maintenanceCost = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.propertyBasicDetailRequest.carpetArea)) {
    errors.carpetArea = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.propertyBasicDetailRequest.attachedOpenAreaOrGarden)) {
    errors.attachedOpenAreaOrGarden = ValidationMessages.fieldRequired.required;
  }
  // ___________________________________________
  if (isBlank(data.propertyBasicDetailRequest.attachedOpenTerraceArea)) {
    errors.attachedOpenTerraceArea = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.propertyAddressRequest.houseNumber)) {
    errors.houseNumber = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.propertyAddressRequest.floorNumber)) {
    errors.floorNumber = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.propertyAddressRequest.totalFloor)) {
    errors.totalFloor = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.addPropertyMoreInfoRequest.propertyDescription)) {
    errors.propertyDescription = ValidationMessages.fieldRequired.required;
  }
  // if (isBlank(data.addPropertyMoreInfoRequest.furnishing  )) {
  //   errors.furnishing   = ValidationMessages.fieldRequired.required;
  // }
  // ___________________________________________
  if (isBlank(data.addPropertyMoreInfoRequest.enteranceFacing)) {
    errors.enteranceFacing = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.addPropertyMoreInfoRequest.security)) {
    errors.security = ValidationMessages.fieldRequired.required;
  }
  // if (isBlank(data.addPropertyMoreInfoRequest.loanAvailable)) {
  //   errors.loanAvailable = ValidationMessages.fieldRequired.required;
  // }
  // if (isBlank(data.addPropertyMoreInfoRequest.loanFromBank)) {
  //   errors.loanFromBank = ValidationMessages.fieldRequired.required;
  // }
  if (isBlank(data.addPropertyMoreInfoRequest.storeDistance)) {
    errors.storeDistance = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.addPropertyMoreInfoRequest.constructionSize)) {
    errors.constructionSize = ValidationMessages.fieldRequired.required;
  }
  // _______________
  // amenities left
  if (isBlank(data.addPropertyMoreInfoRequest.majorityComposition)) {
    errors.majorityComposition = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.addPropertyMoreInfoRequest.religiousPlace)) {
    errors.religiousPlace = ValidationMessages.fieldRequired.required;
  }
  // if (isBlank(data.addPropertyMoreInfoRequest.investmentOpportunity)) {
  //   errors.investmentOpportunity = ValidationMessages.fieldRequired.required;
  // }
  if (isBlank(data.addPropertyMoreInfoRequest.oldRate)) {
    errors.oldRate = ValidationMessages.fieldRequired.required;
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

// validate -- BUILDER PROPERTY FORM
export const validateBuilderProperty = (data) => {
  const errors = {};
  console.log('BP_data', data);
  if (isBlank(data.societyName)) {
    errors.societyName = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.description)) {
    errors.description = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.builderName)) {
    errors.builder = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.reraId)) {
    errors.reraId = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.city)) {
    errors.city = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.street)) {
    errors.street = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.locality)) {
    errors.locality = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.plotArea)) {
    errors.plotArea = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.proposedBuiltUpArea)) {
    errors.proposedBuiltUpArea = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.builtUpArea)) {
    errors.builtUpArea = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.openSpace)) {
    errors.openSpace = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.towerCount)) {
    errors.towerCount = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.amenities)) {
    errors.amenities = ValidationMessages.fieldRequired.required;
  }
  // building component validations
  data.addProjectBuildingRequest.map((cVal, cInd) => {
    if (isBlank(cVal.floors)) {
      errors[ `floors${ cInd }` ] = ValidationMessages.fieldRequired.required;
    }
    if (isBlank(cVal.phase)) {
      errors[ `phase${ cInd }` ] = ValidationMessages.fieldRequired.required;
    }
    if (isBlank(cVal.possessionDate)) {
      errors[ `possessionDate${ cInd }` ] = ValidationMessages.fieldRequired.required;
    }
    if (isBlank(cVal.proposedCompletion)) {
      errors[ `proposedCompletion${ cInd }` ] = ValidationMessages.fieldRequired.required;
    }
    if (isBlank(cVal.revisedDate)) {
      errors[ `revisedDate${ cInd }` ] = ValidationMessages.fieldRequired.required;
    }
    if (isBlank(cVal.startDate)) {
      errors[ `startDate${ cInd }` ] = ValidationMessages.fieldRequired.required;
    }
    if (isBlank(cVal.towerName)) {
      errors[ `towerName${ cInd }` ] = ValidationMessages.fieldRequired.required;
    }
  });

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

// HELPDESK -- CREATE TICKET
// validateCreateTicket

export const validateCreateTicket = (data) => {
  const errors = {};

  console.log('CrtTcktdata', data);
  if (isBlank(data.callFrom)) {
    errors.callFrom = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.phoneNumber)) {
    errors.phoneNumber = ValidationMessages.fieldRequired.required;
  } else if (!isBlank(data.phoneNumber)) {
    if (data.phoneNumber.length !== 10) {
      errors.phoneNumber = ValidationMessages.phoneNumber.invalid;
    }
  }
  if (isBlank(data.problem)) {
    errors.problem = ValidationMessages.fieldRequired.required;
  }

  if (isBlank(data.email)) {
    errors.email = ValidationMessages.fieldRequired.required;
  } else if (!isBlank(data.email)) {
    if (!validateRegex.validateEmail.test(String(data.email).toLowerCase())) {
      errors.email = ValidationMessages.email.invalid;
    }
  }
  // if (isBlank(data.property)) {
  //   errors.property = ValidationMessages.fieldRequired.required;
  // }
  if (isBlank(data.ticketName)) {
    errors.ticketName = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.assignTo)) {
    errors.assignTo = ValidationMessages.fieldRequired.required;
  }
  // if (isBlank(data.actionToSolve)) {
  //   errors.actionToSolve = ValidationMessages.fieldRequired.required;
  // }
  // if (isBlank(data.actionToSolve)) {
  //   errors.actionToSolve = ValidationMessages.fieldRequired.required;
  // }

  if (isBlank(data.severity)) {
    errors.severity = ValidationMessages.fieldRequired.required;
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export const validateAddComments = (data) => {
  const errors = {};

  console.log('Cmmntstdata', data);
  if (isBlank(data)) {
    errors.comments = ValidationMessages.fieldRequired.required;
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export const validateNewPost1 = (data) => {
  const errors = {};
  if(isBlank(data.propertyCategory)) {
    errors.propertyCategory = ValidationMessages.fieldRequired.required
  }

  if(isBlank(data.propertyType)) {
    errors.propertyType = ValidationMessages.fieldRequired.required
  }
  else {
    if(data.propertyType === 'Residential' || data.propertyType === 'Semi Commercial') {
      if(isBlank(data.propertySubType)) {
        errors.propertySubType = ValidationMessages.fieldRequired.required
      }
      if(isBlank(data.bedRooms) || data.bedRooms === 0) {
        errors.bedRooms = ValidationMessages.fieldRequired.required
      }
      if(isBlank(data.numberOfHalls) && data.numberOfHalls !== 0) {
        errors.numberOfHalls = ValidationMessages.fieldRequired.required
      }
      if(isBlank(data.kitchens) || data.kitchens === 0) {
        errors.kitchens = ValidationMessages.fieldRequired.required
      }
      if(isBlank(data.numberOfBaths) || data.numberOfBaths === 0) {
        errors.numberOfBaths = ValidationMessages.fieldRequired.required
      }
      if(isBlank(data.balcony) && data.balcony !== 0) {
        errors.balcony = ValidationMessages.fieldRequired.required
      }
    }
    
    if(data.propertyType === 'Commercial') {
      if(isBlank(data.commercialProjectType)) {
        errors.commercialProjectType = ValidationMessages.fieldRequired.required
      }
      if(isBlank(data.commercialArea)) {
        errors.commercialArea = ValidationMessages.fieldRequired.required
      }
      if(isBlank(data.commercialType)) {
        errors.commercialType = ValidationMessages.fieldRequired.required
      }
      if(isBlank(data.restRoom) && data.restRoom !== 0) {
        errors.restRoom = ValidationMessages.fieldRequired.required
      }
      if(isBlank(data.commonReception) && data.commonReception !== 0) {
        errors.commonReception = ValidationMessages.fieldRequired.required
      }
      if(isBlank(data.kitchenPantry)) {
        errors.kitchenPatry = ValidationMessages.fieldRequired.required
      }
      // if(isBlank(data.leaseType)) {
      //   errors.leaseType = ValidationMessages.fieldRequired.required
      // }
    }
    
    if(data.propertyType === 'Semi Commercial') {
      if(isBlank(data.propertySubType)) {
        errors.propertySubType = ValidationMessages.fieldRequired.required
      }
    }
    if((data.propertyType === 'Semi Commercial' || data.propertyType === 'Residential') && (data.propertyCategory === 'Rent' ||  data.propertyCategory === 'Lease')) {
      if(isBlank(data.leaseType)) {
        errors.leaseType = ValidationMessages.fieldRequired.required
      }
      if(isBlank(data.preferredFor)) {
        errors.preferredFor = ValidationMessages.fieldRequired.required
      }
      if(isBlank(data.purpose)) {
        errors.purpose = ValidationMessages.fieldRequired.required
      }
    }
    
    if(isBlank(data.coveredParking) && data.coveredParking !== 0) {
      errors.coveredParking = ValidationMessages.fieldRequired.required
    }
    if(isBlank(data.openParking) && data.openParking !== 0) {
      errors.openParking = ValidationMessages.fieldRequired.required
    }
    console.log(data)
    
    if(isBlank(data.type)) {
      errors.type = ValidationMessages.fieldRequired.required
    }
    if((data.isNegotiable) === null) {
      errors.isNegotiable = ValidationMessages.fieldRequired.required
    }

  }

  if(isBlank(data.propertyAge) && data.propertyAge !== 0) {
    errors.propertyAge = ValidationMessages.fieldRequired.required
  }
  if(isBlank(data.propertyRate) && data.propertyRate !== 0) {
    errors.propertyRate = ValidationMessages.fieldRequired.required
  }
  if(data.propertySubType === 'Independent House/Villa') {
    if(isBlank(data.plotArea) && data.plotArea !== 0) {
      errors.plotArea = ValidationMessages.fieldRequired.required
    }
  } 
    if(isBlank(data.carpetArea) && data.carpetArea !== 0) {
      errors.carpetArea = ValidationMessages.fieldRequired.required
    }
  
  if(data.propertyAge < 0) {
    errors.propertyAge = "Enter positive values"
  }
  if(data.propertyRate < 0) {
    errors.propertyRate = "Enter positive values"
  }
  if(data.plotArea < 0) {
    errors.plotArea = "Enter positive values"
  }
  if(data.propertyType === "Commercial") {
    if(isBlank(data.balconyOpenArea) && data.balconyOpenArea !== 0) {
      errors.balconyOpenArea = ValidationMessages.fieldRequired.required
    }
    if((data.balconyOpenArea < 0)) {
      errors.balconyOpenArea = "Enter positive values"
    }  
  }
  if((data.attachedOpenAreaOrGarden < 0)) {
    errors.attachedOpenAreaOrGarden = "Enter positive values"
  }
  if(data.attachedOpenTerraceArea < 0) {
    errors.attachedOpenTerraceArea = "Enter positive values"
  }


  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export const validateNewPost2 = (data) => {
  const errors = {};

  if(isBlank(data.city)) {
    errors.city = ValidationMessages.fieldRequired.required
  }
  if(isBlank(data.buildingProjectSociety)) {
    errors.buildingProjectSociety = ValidationMessages.fieldRequired.required
  }
  if(isBlank(data.locality)) {
    errors.locality = ValidationMessages.fieldRequired.required
  }
  // if(isBlank(data.towerName)) {
  //   errors.towerName = ValidationMessages.fieldRequired.required
  // }
  if(isBlank(data.houseNumber)) {
    errors.houseNumber = "Required"
  }
  if(isBlank(data.floorNumber)) {
    errors.plotNo = "Required"
  }
  if(isBlank(data.totalFloor)) {
    errors.totalFloor = "Required"
  }
  console.log(errors)
  return {
    errors,
    isValid: isEmpty(errors)
  }
}