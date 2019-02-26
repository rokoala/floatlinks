const ServiceProviderModel = require('../models/serviceprovider.model');
const CustomerModel = require('../models/customer.model');
const moment = require('moment');
const axios = require('axios');

(async () => {
  console.log('Cleaning all database...');
  await ServiceProviderModel.deleteMany({}).exec();
  await CustomerModel.deleteMany({}).exec();

  // const ServiceProviderExample = {
  //   name: 'Dra. Alita',
  //   phone: 1611112222,
  //   password: 'alita',
  //   defaultSlotDuration: 5,
  //   agenda: {
  //     slots: [
  //       {
  //         date: new Date(),
  //         startTime: 1000,
  //         slotDuration: 30,
  //         isOccupied: false,
  //         isPublic: true,
  //         customer: null,
  //         annotation: 'Horário teste',
  //       },
  //       {
  //         date: new Date(),
  //         startTime: 1100,
  //         slotDuration: 30,
  //         isOccupied: false,
  //         isPublic: true,
  //         customer: null,
  //         annotation: 'Horário teste no mesmo dia, horário diferente',
  //       },
  //       {
  //         date: moment()
  //           .add(1, 'days')
  //           .toDate(),
  //         startTime: 1100,
  //         slotDuration: 30,
  //         isOccupied: false,
  //         isPublic: true,
  //         customer: null,
  //         annotation: 'Horário teste dia depois, horário diferente',
  //       },
  //     ],
  //     isOpen: true,
  //   },
  // };

  // console.log(`Creating Service Provider ${ServiceProviderExample.name}`);
  // console.log(ServiceProviderExample);
  // const serviceProviderModel = await ServiceProviderModel.create(
  //   ServiceProviderExample,
  // );

  // const CustomerExample = {
  //   name: 'John',
  //   phone: 11111111111,
  //   serviceProviders: [
  //     {
  //       providerId: serviceProviderModel._id,
  //       name: serviceProviderModel.name,
  //       phone: serviceProviderModel.phone,
  //       appointments: [],
  //     },
  //   ],
  // };

  // console.log(`Creating Customer ${CustomerExample.name}`);
  // console.log(CustomerExample);
  // await CustomerModel.create(CustomerExample);

  // Create data with REST...

  // Create Service Provider
  const serviceProvider = await axios.post(
    'http://localhost:3001/serviceprovider',
    {
      name: 'Dra. Alita',
      phone: 1611112222,
      password: 'alita',
      defaultSlotDuration: 5,
      agenda: {
        slots: [],
        isOpen: true
      }
    }
  );

  console.log(serviceProvider);

  // Create Customer
  await axios.post('http://localhost:3001/customer', {
    name: 'John',
    phone: 11111111111,
    serviceProviders: [
      {
        providerId: serviceProvider.data._id,
        name: 'Dra. Alita',
        phone: 1611112222,
        appointments: []
      }
    ]
  });

  // Create some slots
  await axios.post('http://localhost:3001/appointment/serviceprovider/slot/', {
    serviceProviderId: serviceProvider.data._id,
    slot: {
      date: new Date(),
      startTime: 1000,
      slotDuration: 30,
      isOccupied: false,
      isPublic: true,
      customer: null,
      isConfirmed: false,
      annotation: 'Horário teste'
    }
  });

  await axios.post('http://localhost:3001/appointment/serviceprovider/slot/', {
    serviceProviderId: serviceProvider.data._id,
    slot: {
      date: new Date(),
      startTime: 1100,
      slotDuration: 30,
      isOccupied: false,
      isPublic: true,
      customer: null,
      isConfirmed: false,
      annotation: 'Horário teste no mesmo dia, horário diferente'
    }
  });

  await axios.post('http://localhost:3001/appointment/serviceprovider/slot/', {
    serviceProviderId: serviceProvider.data._id,
    slot: {
      date: moment()
        .add(1, 'days')
        .toDate(),
      startTime: 1100,
      slotDuration: 30,
      isOccupied: false,
      isPublic: true,
      customer: null,
      isConfirmed: false,
      annotation: 'Horário teste um dia depois, horário diferente'
    }
  });

  process.exit();
})();
