// schema.js in Sanity Studio

export default {
    name: 'formData',
    title: 'User Profile Data',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'phone',
        title: 'Phone',
        type: 'string',
      },
      {
        name: 'address',
        title: 'Address',
        type: 'string',
      },
      {
        name: 'user', // Reference to the user who submitted the form
        title: 'User',
        type: 'reference',
        to: [{ type: 'user' }], // Assuming you have a 'user' schema for authentication
      },
    ],
  };
  