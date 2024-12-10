import React, { useState } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const AllTeams = () => {

const sampleUsers = [
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
        { id: 3, firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com' },
        { id: 4, firstName: 'Özge', lastName: 'Alkan', email: 'jane.smith@example.com' },
        { id: 5, firstName: 'Betül', lastName: 'Şanlı', email: 'john.doe@example.com' },

    ];

    const sampleTeams = [
        {
        id: 1,
        name: 'Team 1',
        members: [1, 2], // Store only IDs
        },
        {
        id: 2,
        name: 'Team 2',
        members: [3, 4, 5],
        },
    ];

  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleOpenDialog = (teamId) => {
    const team = sampleTeams.find(team => team.id === teamId);
    setSelectedTeam(team);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedTeam(null);
  };

  return (
    <>
      <Typography
        variant="h4"
        fontWeight="bold"
        style={{ margin: '30px 0', padding: '0 25px', fontSize: '25px' }}
      >
        All Teams
      </Typography>

      {/* Render all teams */}
      {sampleTeams.map(team => (
        <Box
          key={team.id}
          sx={{
            border: '1px solid #424242', // Dark gray border for contrast
            borderRadius: 3,
            padding: 2,
            margin: '16px 16px',
            cursor: 'pointer',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', // Slightly stronger shadow for a dark background
            transition: 'background-color 0.2s ease',
            backgroundColor: '#1E1E1E', // Default box background
            color: '#FFFFFF', // White text
            '&:hover': { backgroundColor: '#333333' }, // Darker gray on hover
          }}
          onClick={() => handleOpenDialog(team.id)}
        >
          <Typography variant="h6">{team.name}</Typography>
        </Box>
      ))}

      {/* Dialog for team details */}
      {selectedTeam && (
        <Dialog
          open={open}
          onClose={handleCloseDialog}
          maxWidth="md" // Set a maximum width ('xs', 'sm', 'md', 'lg', 'xl', or false for custom sizing)
            fullWidth // Ensures the dialog takes the full width of the screen up to the maxWidth
            PaperProps={{
            sx: {
            width: '400px', // Set custom width
            maxHeight: '80vh', // Set maximum height (e.g., 80% of the viewport height)
            },
  }}
        >
          <DialogTitle>{selectedTeam.name}</DialogTitle>
          <DialogContent>
            {selectedTeam.members.map(memberId => {
              const user = sampleUsers.find(user => user.id === memberId);
              return (
                <Box key={user.id} sx={{ marginBottom: 1 }}>
                  <Typography>{`${user.firstName} ${user.lastName}`}</Typography>
                  <Typography variant="body2" color="textSecondary">{user.email}</Typography>
                </Box>
              );
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default AllTeams;
