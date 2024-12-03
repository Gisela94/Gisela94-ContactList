const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
			agenda: "jason"  // TODO: Si no esta, crear agenda con este nombre en la api
		},
		actions: {
			getAgenda: () => {
				const store = getStore();
				fetch(`https://playground.4geeks.com/contact/agendas/${store.agenda}/contacts`)
					.then(response => response.json())
					.then(data => {
						console.log(data); // Check if your API returns the expected data
						if (data && Array.isArray(data.contacts)) {
							setStore({ contacts: data.contacts });
						} else {
							console.error("API did not return an array", data);
						}
					})

			},


			addContact: (contact) => {
				const { contacts, agenda } = getStore();
				fetch(`https://playground.4geeks.com/contact/agendas/${agenda}/contacts`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(contact)
				}).then(response => response.json())
					.then(data => setStore({ contacts: [...contacts, data] }))
					.catch(error => console.log("Error adding contact: ", error))
			},

			deleteContact: (id) => {
				const { contacts, agenda } = getStore();
				fetch(`https://playground.4geeks.com/contact/agendas/${agenda}/contacts/${id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					},
				}).then(() => {
					const newContacts = contacts.filter(contact => contact.id !== id);
					setStore({ contacts: newContacts });
				}).catch(error => console.log("Error deleting contact: ", error))
			},

			editContact: (id, contact) => {
				const { contacts, agenda } = getStore();
				fetch(`https://playground.4geeks.com/contact/agendas/${agenda}/contacts/${id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(contact)
				}).then(response => response.json())
					.then(data => {
						const newContacts = contacts.map(contactItem => {
							if (contactItem.id === contact.id) {
								return data;
							}
							return contactItem;
						});
						setStore({ contacts: newContacts });
					})
					.catch(error => console.log("Error editing contact: ", error))
			},
		}
	};
};

export default getState;
