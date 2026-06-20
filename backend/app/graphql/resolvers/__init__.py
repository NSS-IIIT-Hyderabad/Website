from app.graphql.resolvers.admin import mutations as admin_mutations, queries as admin_queries
from app.core.bootstrap import bootstrap_admins_from_nss_core
from app.graphql.resolvers.users import queries as user_queries

queries = [*user_queries, *admin_queries]
mutations = [*admin_mutations]

__all__ = ["bootstrap_admins_from_nss_core", "queries", "mutations"]
