module.exports = {
  useLocation: () => ({
    pathname: '/',
  }),
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useHistory: () => ({
    push: jest.fn(),
  }),
  useNavigate: () => jest.fn(),
};