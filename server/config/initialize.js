const ServiceProviderModel = require('../models/serviceprovider.model');
const CustomerModel = require('../models/customer.model');
const moment = require('moment');

(async () => {
  console.log('Cleaning all database...');
  await ServiceProviderModel.remove({}).exec();
  await CustomerModel.remove({}).exec();

  const ServiceProviderExample = {
    name: 'Dra. Alita',
    phone: 1611112222,
    password: 'alita',
    defaultSlotDuration: 5,
    agenda: {
      slots: [
        {
          date: new Date(),
          startTime: 1000,
          slotDuration: 30,
          isOccupied: false,
          isPublic: true,
          customer: null,
          annotation: 'Horário teste',
        },
        {
          date: new Date(),
          startTime: 1100,
          slotDuration: 30,
          isOccupied: false,
          isPublic: true,
          customer: null,
          annotation: 'Horário teste no mesmo dia, horário diferente',
        },
        {
          date: moment()
            .add(1, 'days')
            .toDate(),
          startTime: 1100,
          slotDuration: 30,
          isOccupied: false,
          isPublic: true,
          customer: null,
          annotation: 'Horário teste dia depois, horário diferente',
        },
      ],
      isOpen: true,
    },
  };

  const CustomerExample = {
    name: 'John',
    phone: 11111111111,
    serviceProviders: [],
  };

  console.log(`Creating Service Provider ${ServiceProviderExample.name}`);
  console.log(ServiceProviderExample);
  await ServiceProviderModel.create(ServiceProviderExample);

  console.log(`Creating Customer ${CustomerExample.name}`);
  console.log(CustomerExample);
  await CustomerModel.create(CustomerExample);

  process.exit();
})();
