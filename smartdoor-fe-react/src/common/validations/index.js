/** @format */

// import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import ValidationMessages from '../helpers/ValidationMessages';
import validateRegex from '../helpers/ValidateRegex';
import { isValid } from 'date-fns';
import { da } from 'date-fns/locale';
import { showErrorToast } from '../helpers/Utils';

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

export const validateNewPlan = (data) => {
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


  if (data.planHirarchy < 0) {
    errors.planHirarchy = ValidationMessages.negativeNumber.invalid;
  }

  if (data.depositeAmount < 0) {
    errors.depositeAmount = ValidationMessages.negativeNumber.invalid;
  }

  if (data.subscriptionMonth < 0) {
    errors.subscriptionMonth = ValidationMessages.negativeNumber.invalid;
  }

  if (data.installationCharges < 0) {
    errors.installationCharges = ValidationMessages.negativeNumber.invalid;
  }
  if (data.baseRentalCoins < 0) {
    errors.baseRentalCoins = ValidationMessages.negativeNumber.invalid;
  }

  if (data.renewalCoins < 0) {
    errors.baseRentalCoins = ValidationMessages.negativeNumber.invalid;
  }

  if (data.renewalInterval < 0) {
    errors.renewalInterval = ValidationMessages.negativeNumber.invalid;
  }

  if (data.gstValue <= 0) {
    errors.gstValue = ValidationMessages.negativeNumber.invalid;
  }
  if (isBlank(data.gstValue)) {
    errors.gstValue = ValidationMessages.fieldRequired.required;
  }

  if (isBlank(data.imageLocation)) {
    errors.imageLocation = "Image required"
  }

  // if (isBlank(data.amount)) {
  //   errors.amount = ValidationMessages.fieldRequired.required;
  // } 

  console.log("Erros: ", errors)

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
  if ((data.city?.length === 0)) {
    errors.city = ValidationMessages.fieldRequired.required;
  }
  console.log(data, "ddddddddddddddddddddddddddd")

  // if ( !(data.post==='3' || data.post==='7' || data.post==='8' || data.post==='10' || data.post==='13' || data.post==='14' || data.post==='16' ||  data.post==='1' || (data.post.toLowerCase().includes("admin"))) && data.location.length < 1) {
  //   errors.location = ValidationMessages.fieldRequired.required;
  // }
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
      errors[`floors${cInd}`] = ValidationMessages.fieldRequired.required;
    }
    if (isBlank(cVal.phase)) {
      errors[`phase${cInd}`] = ValidationMessages.fieldRequired.required;
    }
    if (isBlank(cVal.possessionDate)) {
      errors[`possessionDate${cInd}`] = ValidationMessages.fieldRequired.required;
    }
    if (isBlank(cVal.proposedCompletion)) {
      errors[`proposedCompletion${cInd}`] = ValidationMessages.fieldRequired.required;
    }
    if (isBlank(cVal.revisedDate)) {
      errors[`revisedDate${cInd}`] = ValidationMessages.fieldRequired.required;
    }
    if (isBlank(cVal.startDate)) {
      errors[`startDate${cInd}`] = ValidationMessages.fieldRequired.required;
    }
    if (isBlank(cVal.towerName)) {
      errors[`towerName${cInd}`] = ValidationMessages.fieldRequired.required;
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
  if (isBlank(data.propertyCategory)) {
    errors.propertyCategory = ValidationMessages.fieldRequired.required
  }

  if (isBlank(data.propertyType)) {
    errors.propertyType = ValidationMessages.fieldRequired.required
  }
  else {
    if (data.propertyType === 'Residential' || data.propertyType === 'Semi Commercial') {
      if (isBlank(data.propertySubType)) {
        errors.propertySubType = ValidationMessages.fieldRequired.required
      }
      if (isBlank(data.bedRooms) || data.bedRooms === 0) {
        errors.bedRooms = ValidationMessages.fieldRequired.required
      }
      if (isBlank(data.numberOfHalls) && data.numberOfHalls !== 0) {
        errors.numberOfHalls = ValidationMessages.fieldRequired.required
      }
      if (isBlank(data.kitchens) || data.kitchens === 0) {
        errors.kitchens = ValidationMessages.fieldRequired.required
      }
      if (isBlank(data.numberOfBaths) || data.numberOfBaths === 0) {
        errors.numberOfBaths = ValidationMessages.fieldRequired.required
      }
      if (isBlank(data.balcony) && data.balcony !== 0) {
        errors.balcony = ValidationMessages.fieldRequired.required
      }
    }

    if (data.propertyType === 'Commercial') {
      if (isBlank(data.commercialProjectType)) {
        errors.commercialProjectType = ValidationMessages.fieldRequired.required
      }
      if (isBlank(data.commercialArea)) {
        errors.commercialArea = ValidationMessages.fieldRequired.required
      }
      if (isBlank(data.commercialType)) {
        errors.commercialType = ValidationMessages.fieldRequired.required
      }
      if (isBlank(data.restRoom) && data.restRoom !== 0) {
        errors.restRoom = ValidationMessages.fieldRequired.required
      }
      if (isBlank(data.commonReception) && data.commonReception !== 0) {
        errors.commonReception = ValidationMessages.fieldRequired.required
      }
      if (isBlank(data.kitchenPantry)) {
        errors.kitchenPatry = ValidationMessages.fieldRequired.required
      }
      // if(isBlank(data.leaseType)) {
      //   errors.leaseType = ValidationMessages.fieldRequired.required
      // }
    }

    if (data.propertyType === 'Semi Commercial') {
      if (isBlank(data.propertySubType)) {
        errors.propertySubType = ValidationMessages.fieldRequired.required
      }
    }
    if ((data.propertyType === 'Semi Commercial' || data.propertyType === 'Residential') && (data.propertyCategory === 'Rent' || data.propertyCategory === 'Lease')) {
      if (isBlank(data.leaseType)) {
        errors.leaseType = ValidationMessages.fieldRequired.required
      }
      if (isBlank(data.preferredFor)) {
        errors.preferredFor = ValidationMessages.fieldRequired.required
      }
      if (isBlank(data.purpose)) {
        errors.purpose = ValidationMessages.fieldRequired.required
      }
    }

    if (isBlank(data.coveredParking) && data.coveredParking !== 0) {
      errors.coveredParking = ValidationMessages.fieldRequired.required
    }
    if (isBlank(data.openParking) && data.openParking !== 0) {
      errors.openParking = ValidationMessages.fieldRequired.required
    }
    console.log(data)

    if (isBlank(data.type)) {
      errors.type = ValidationMessages.fieldRequired.required
    }
    if ((data.isNegotiable) === null) {
      errors.isNegotiable = ValidationMessages.fieldRequired.required
    }

  }

  if (isBlank(data.propertyAge) && data.propertyAge !== 0) {
    errors.propertyAge = ValidationMessages.fieldRequired.required
  }
  if (isBlank(data.propertyRate) && data.propertyRate !== 0) {
    errors.propertyRate = ValidationMessages.fieldRequired.required
  }
  if (data.propertySubType === 'Independent House/Villa') {
    if (isBlank(data.plotArea) && data.plotArea !== 0) {
      errors.plotArea = ValidationMessages.fieldRequired.required
    }
  }
  if (isBlank(data.carpetArea) && data.carpetArea !== 0) {
    errors.carpetArea = ValidationMessages.fieldRequired.required
  }

  if (data.propertyAge < 0) {
    errors.propertyAge = "Enter positive values"
  }
  if (data.propertyRate < 0) {
    errors.propertyRate = "Enter positive values"
  }
  if (data.plotArea < 0) {
    errors.plotArea = "Enter positive values"
  }
  if (data.propertyType === "Commercial") {
    if (isBlank(data.balconyOpenArea) && data.balconyOpenArea !== 0) {
      errors.balconyOpenArea = ValidationMessages.fieldRequired.required
    }
    if ((data.balconyOpenArea < 0)) {
      errors.balconyOpenArea = "Enter positive values"
    }
  }
  if ((data.attachedOpenAreaOrGarden < 0)) {
    errors.attachedOpenAreaOrGarden = "Enter positive values"
  }
  if (data.attachedOpenTerraceArea < 0) {
    errors.attachedOpenTerraceArea = "Enter positive values"
  }


  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export const validateNewPost2 = (data) => {
  const errors = {};

  if (isBlank(data.city)) {
    errors.city = ValidationMessages.fieldRequired.required
  }
  if (isBlank(data.buildingProjectSociety)) {
    errors.buildingProjectSociety = ValidationMessages.fieldRequired.required
  }
  if (isBlank(data.locality)) {
    errors.locality = ValidationMessages.fieldRequired.required
  }
  // if(isBlank(data.towerName)) {
  //   errors.towerName = ValidationMessages.fieldRequired.required
  // }
  if (isBlank(data.houseNumber)) {
    errors.houseNumber = "Required"
  }
  // if(isBlank(data.floorNumber)) {
  //   errors.plotNo = "Required"
  // }
  // if(isBlank(data.totalFloor)) {
  //   errors.totalFloor = "Required"
  // }
  console.log(errors)
  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export const validateAgencyDetails = (data) => {
  const errors = {};
  if (!isBlank(data.agencyName)) {
    if (data.agencyName?.trim() === '' || data.agencyName === null) {
      errors.agencyName = ValidationMessages.fieldRequired.required;
    }
  } else {
    errors.agencyName = ValidationMessages.fieldRequired.required;
  }
  if (!isBlank(data.location)) {
    if (data.location?.trim() === '' || data.location === null) {
      errors.location = ValidationMessages.fieldRequired.required;
    }
  } else {
    errors.location = ValidationMessages.fieldRequired.required;
  }
  if (!isBlank(data.contactName)) {
    if (data.contactName?.trim() === '' || data.contactName === null) {
      errors.contactName = ValidationMessages.fieldRequired.required;
    }
  } else {
    errors.contactName = ValidationMessages.fieldRequired.required;
  }

  if (isBlank(data.contactNumber)) {
    errors.contactNumber = ValidationMessages.fieldRequired.required;
  }
  else if ((data.contactNumber?.trim())?.length === 0 || data.contactName === null) {
    errors.contactNumber = ValidationMessages.fieldRequired.required;
    if ((data.contactNumber?.trim())?.length !== 10 || Number(data.contactNumber) < 0) {
      errors.contactNumber = 'Contact Number must be 10 digits';
    }
  }
  if (!isBlank(data.contactEmail)) {
    if (!validateRegex.validateEmail.test(data.contactEmail)) {
      errors.contactEmail = ValidationMessages.email.invalid;
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export const validateExecutiveDetails = (data) => {
  const errors = {};
  if (data.location?.trim() === '' || data.location === null) {
    errors.location = ValidationMessages.fieldRequired.required;
  }
  if (data.executiveName?.trim() === '' || data.executiveName === null) {
    errors.executiveName = ValidationMessages.fieldRequired.required;
  }
  if (isBlank(data.executiveNumber)) {
    errors.executiveNumber = ValidationMessages.fieldRequired.required;
  }
  if ((data.executiveNumber?.trim())?.length === 0 || data.executiveNumber === null) {
    errors.executiveNumber = ValidationMessages.fieldRequired.required;
    // if(data.executiveNumber.includes('-') || data.executiveNumber.includes('+')) {
    // }
    if ((data.executiveNumber?.trim())?.length !== 10 || Number(data.executiveNumber) < 0) {
      errors.executiveNumber = 'Contact Number must be 10 digits';
    }
  }
  if (!isBlank(data.executiveEmail)) {
    if (!validateRegex.validateEmail.test(data.executiveEmail)) {
      errors.executiveEmail = ValidationMessages.email.invalid;
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export const validateBasicDetails = (data) => {
  const errors = {};
  if (isBlank(data.propertyCategory)) {
    errors.propertyCategory = true;
  }
  if (isBlank(data.stageOfProperty)) {
    errors.stageOfProperty = true;
  }
  if (isBlank(data.propertyType)) {
    errors.propertyType = true;
  }
  if (data.propertyType === 'Residential') {
    if (isBlank(data.propertySubType)) {
      errors.propertySubType = true;
    }
  }
  if (data.stageOfProperty === 'Ready' && data.propertySubType !== 'Plot') {
    if (isBlank(data.ageOfProperty)) {
      errors.ageOfProperty = true;
    }
    if ((data.ageOfProperty) < 0) {
      errors.ageOfProperty = true;
      showErrorToast("Invalid property age")
    }
  }
  if (data.stageOfProperty === 'Under Construction' && data.propertySubType !== 'Plot') {
    if (isBlank(data.expectedPossessionDate)) {
      errors.expectedPossessionDate = true;
    }
  }
  if (data.propertySubType === 'PG/Co-Living') {
    if (isBlank(data.guestHouseOrPgPropertyType)) {
      errors.guestHouseOrPgPropertyType = true;
    }
    if (isBlank(data.occupancySharing)) {
      errors.occupancySharing = true;
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export const validateAddressDetails = (data, floorFlag) => {
  const errors = {};
  if (isBlank(data.locality)) {
    errors.locality = true;
  }
  if (isBlank(data.city)) {
    errors.city = true;
  }
  if (isBlank(data.houseNumber)) {
    errors.houseNumber = true;
  }
  // if (isBlank(data.landmark)) {
  //   errors.landmark = true;
  // }
  // if (isBlank(data.builder)) {
  //   errors.builder = true;
  // }
  if (isBlank(data.buildingProjectSociety)) {
    errors.buildingProjectSociety = true;
  }
  if (floorFlag) {
    if (isBlank(data.floorNumber)) {
      errors.floorNumber = true;
    }
    if (data.floorNumber < 0) {
      errors.floorNumber = true;
      showErrorToast("Invalid floor number")
    }
    if (isBlank(data.totalFloors)) {
      errors.totalFloors = true;
      showErrorToast("Invalid total floor")
    }
    if (data.totalFloors < 0) {
      errors.totalFloors = true;
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export const validateSpecs = (data, specList, testDesc) => {
  const errors = {};

  if (specList?.includes('BHK')) {
    if (isBlank(data.numberOfRooms)) {
      errors.numberOfRooms = true;
    }
    if (Number(data.numberOfRooms) > 8) {
      errors.numberOfRooms = true;
      showErrorToast("Maximum no. of rooms should be 8")
    }
    if (Number(data.numberOfRooms) < 0) {
      errors.numberOfRooms = true;
      showErrorToast("Minimum no. of rooms should be 1")
    }
    if (isBlank(data.propertyRoomCompositionType)) {
      errors.propertyRoomCompositionType = true;
    }
  }
  if (specList?.includes('Attached')) {
    if (isBlank(data.pgGuestHouseAttachedTo)) {
      errors.pgGuestHouseAttachedTo = true;
    }
  }
  if (specList?.includes('Structure')) {
    if (isBlank(data.structure)) {
      errors.structure = true;
    }
  }
  if (specList?.includes('Flat type')) {
    if (isBlank(data.flatType)) {
      errors.flatType = true;
    }
  }
  if (specList?.includes('Carpet area/built-up area')) {
    if (isBlank(data.carpetArea)) {
      errors.carpetArea = true;
    }
    if (Number(data.carpetArea) < 0) {
      errors.carpetArea = true;
    }
    if (isBlank(data.carpetAreaMeasurementUnit)) {
      errors.carpetAreaMeasurementUnit = true;
    }
    if (isBlank(data.builtUpArea)) {
      errors.builtUpArea = true;
    }
    if (Number(data.builtUpArea) < 0) {
      errors.builtUpArea = true;
    }
    if (isBlank(data.builtUpAreaMeasurementUnit)) {
      errors.builtUpAreaMeasurementUnit = true;
    }
  }
  if (specList?.includes('Carpet area/built-up area of the room')) {
    if (isBlank(data.carpetArea)) {
      errors.carpetArea = true;
    }
    if (Number(data.carpetArea) < 0) {
      errors.carpetArea = true;
    }
    if (isBlank(data.carpetAreaMeasurementUnit)) {
      errors.carpetAreaMeasurementUnit = true;
    }
    if (isBlank(data.builtUpArea)) {
      errors.builtUpArea = true;
    }
    if (Number(data.builtUpArea) < 0) {
      errors.builtUpArea = true;
    }
    if (isBlank(data.builtUpAreaMeasurementUnit)) {
      errors.builtUpAreaMeasurementUnit = true;
    }
  }
  if (specList?.includes('Plot area')) {
    if (isBlank(data.plotArea)) {
      errors.plotArea = true;
    }
    if (Number(data.plotArea) < 0) {
      errors.plotArea = true;
    }
    if (isBlank(data.plotAreaMeasurementUnit)) {
      errors.plotAreaMeasurementUnit = true;
    }
  }
  if (specList?.includes('Open area')) {
    // if (isBlank(data.openArea)) {
    //   errors.openArea = true;
    // }
    if (Number(data.openArea) < 0) {
      errors.openArea = true;
    }
    if (isBlank(data.openAreaMeasurementUnit)) {
      errors.openAreaMeasurementUnit = true;
    }
  }
  if (specList?.includes('Property type')) {
    if (isBlank(data.commercialPropertyType)) {
      errors.commercialPropertyType = true;
    }
  }
  if (specList?.includes('Purpose')) {
    if ((data.commercialPropertyPurposes).length === 0) {
      errors.commercialPropertyPurposes = true;
    }
  }
  if (specList?.includes('Number of balconies')) {
    if (Number(data.numberOfBalconies) < 0) {
      errors.numberOfBalconies = true;
      showErrorToast('Invalid number of balconies')
    }
    if (Number(data.numberOfBalconies) > 6) {
      errors.numberOfBalconies = true;
      showErrorToast('Maximum 6 balconies allowed')
    }
  }
  if (specList?.includes('Number of balconies')) {
    if (Number(data.numberOfBalconies) < 0) {
      errors.numberOfBalconies = true;
    }
  }
  if (specList?.includes('Number of washrooms')) {
    if (Number(data.numberOfBaths) > 6) {
      errors.numberOfBaths = true;
      showErrorToast('Maximum 6 washrooms allowed')
    }
    if (isBlank(data.numberOfBaths)) {
      errors.numberOfBaths = true;
    }
    if (Number(data.numberOfBaths) < 0) {
      errors.numberOfBaths = true;
    }
  }
  if (specList?.includes('Car parkings')) {
    if (Number(data.numberOfCarParking) > 6) {
      errors.numberOfCarParking = true;
      showErrorToast('Maximum 6 Car parkings allowed')
    }
    if (Number(data.numberOfCarParking) < 0) {
      errors.numberOfCarParking = true;
      showErrorToast('Invalid no. of car parkings')
    }
  }
  if (specList?.includes('Reserved car parkings')) {
    if (Number(data.numberOfReservedCarParking) > 6) {
      errors.numberOfReservedCarParking = true;
      showErrorToast('Maximum 6 Reserved Car parkings allowed')
    }
    if (Number(data.numberOfReservedCarParking) < 0) {
      errors.numberOfReservedCarParking = true;
      showErrorToast('Invalid no. of reserved car parkings')
    }
    if (isBlank(data.numberOfReservedCarParking)) {
      errors.numberOfReservedCarParking = true;
    }
  }
  if (specList?.includes('Reserved two wheeler parkings')) {
    if (Number(data.numberOfReservedTwoWheelerParking) > 6) {
      errors.numberOfReservedTwoWheelerParking = true;
      showErrorToast('Maximum 6 Reserved two wheeler parkings allowed')
    }
    if (Number(data.numberOfReservedTwoWheelerParking) < 0) {
      errors.numberOfReservedTwoWheelerParking = true;
      showErrorToast('Invalid no. of reserved two wheeler parkings')
    }
  }
  if (specList?.includes('Property description') && testDesc === true) {
    if (isBlank(data.propertyDescription)) {
      errors.propertyDescription = true;
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export const validatePricing = (data, pricingList) => {
  const errors = {};

  if (pricingList.includes('Rent')) {
    if (isBlank(data.propertyRate)) {
      errors.propertyRate = true;
    }
    if (Number(data.propertyRate) < 0 || Number(data.propertyRate) < 5000) {
      errors.propertyRate = true;
      showErrorToast("Invalid rent value")
    }
  }
  if (pricingList.includes('Security deposit')) {
    if (!isBlank(data.securityAmount)) {
      if (Number(data.securityAmount) < 0) {
        errors.securityAmount = true;
        showErrorToast("Invalid deposit value, minimum 5000 required")
      }
    }
  }
  if (pricingList.includes('Preferred for')) {
    if (isBlank(data.preferredFor)) {
      errors.preferredFor = true;
    }
  }
  if (pricingList.includes('Selling price')) {
    if (isBlank(data.propertyRate)) {
      errors.propertyRate = true;
    }
    if (Number(data.propertyRate) < 0 || Number(data.propertyRate) < 1000000) {
      errors.propertyRate = true;
      showErrorToast("Invalid selling price, minimum 1000000 required")
    }
  }
  if (pricingList.includes('Distress CheckBox')) {
    if ((data.isQuickSale) === null) {
      errors.isQuickSale = true;
    }
    if(data.isQuickSale === true) {
      if (pricingList.includes('Expected time')) {
        if (isBlank(data.expectedTimeToSellThePropertyWithin)) {
          errors.expectedTimeToSellThePropertyWithin = true;
        }
      }
    }
  }
  if (pricingList.includes('Add additional fields')) {
    errors.additionalFieldsForChargesDue = []
    let hasError = false
    for (let i = 0; i < data.additionalFieldsForChargesDue.length; i++) {
      errors.additionalFieldsForChargesDue.push({ label: false, charge: false });
      if (isBlank(data.additionalFieldsForChargesDue[i].label)) {
        // errors.additionalFieldsForChargesDue[i].label = true;
        errors.additionalFieldsForChargesDue[errors.additionalFieldsForChargesDue.length - 1].label = true;
        hasError = true;
      }
      if (isBlank(data.additionalFieldsForChargesDue[i].charge) || data.additionalFieldsForChargesDue[i].charge <= 0) {
        errors.additionalFieldsForChargesDue[errors.additionalFieldsForChargesDue.length - 1].charge = true;
        hasError = true;
      }
    }
    if (!hasError) {
      delete errors.additionalFieldsForChargesDue;
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export const validateTermsConditions = (data) => {
  const errors = {};

  // if(isBlank(data.visitGuidelines)) {
  //   errors.visitGuidelines = true;
  // }
  // if(isBlank(data.securityGuardNumber)) {
  //   errors.securityGuardNumber = true;
  // }
  if (!isBlank(data.securityGuardNumber)) {
    if ((data.securityGuardNumber.trim()).length < 10) {
      errors.securityGuardNumber = true;
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export const validateCameraData = (data, addNewFlag) => {
  const errors = {};
  if (isBlank(data.uuId)) {
    errors.uuId = true;
  }
  if (isBlank(data.userName)) {
    errors.userName = true;
  }
  if (isBlank(data.password)) {
    errors.password = true;
  }
  if (isBlank(data.nickName)) {
    errors.nickName = true;
  }
  if (isBlank(data.CameraType)) {
    errors.CameraType = true;
  }
  if (addNewFlag) {
    if (isBlank(data.cameraId)) {
      errors.cameraId = true;
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}